import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Modal, Image, message } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';
import FirebaseAuth from '../../Components/FirebaseAuth';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { IRequestInfo } from '../../type';
import { useAuth } from '../../Components/AuthProvider';
import { uploadRequestToFirebase } from '../../linksStoreToFirebase';
import { useDispatch } from 'react-redux';
import {
  emptyState,
  setStatus,
} from '../../Store/actions/requestActionCreators';
require('../../CSS/Send.css');

import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const PROGRESS = 100;
const NEXT_SCREEN = '/createSendRequest';

const RequestSummary: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  console.log(objecInfo);

  const { uid } = useAuth();

  const handleConfirm = async () => {
    dispatch(setStatus('unmatched'));
    console.log('About to upload request');
    if (uid) {
      console.log('valid uid');
      try {
        const uploadSuccess = await uploadRequestToFirebase(uid, dispatch);
        if (uploadSuccess) {
          message.success('Successfully uploaded request!');
          // Construct HTML email content
          const emailContent = `
          <table>
            <tr><th>Title</th><td>${objecInfo.name}</td></tr>
            <tr><th>Pickup Address</th><td>${objecInfo.pickup_address}</td></tr>
            <tr><th>Delivery Address</th><td>${objecInfo.delivery_adress}</td></tr>
            <tr><th>Date Range</th><td>From ${objecInfo.dateRange[0]} to ${objecInfo.dateRange[1]}</td></tr>
            <tr><th>Time</th><td>${objecInfo.time}</td></tr>
            <tr><th>Price</th><td>${objecInfo.price} CHF</td></tr>
            <tr><th>Weight</th><td>${objecInfo.weight}</td></tr>
            <tr><th>Size</th><td>${objecInfo.size}</td></tr>
            <tr><th>Description</th><td>${objecInfo.description}</td></tr>
            <tr><th>Request ID</th><td>${objecInfo.id}</td></tr>
            <tr><th>Request UID</th><td>${uid}</td></tr>
          </table>
        `;
          // send notification email to support
          const emailBody = {
            title: 'New delivery request submitted',
            body: emailContent,
            uid: uid,
            email: 'support@portato.io',
            admin: true,
          };
          const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
          fetch(
            `https://europe-west1-${projectId}.cloudfunctions.net/sendNotificationEmail`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(emailBody),
            }
          )
            .then((response) => response.json())
            .then((result) => {
              // Read result of the Cloud Function.
              console.log(result);
            })
            .catch((error) => {
              // Getting the error details
              console.error(`error: ${error}`);
            });

          dispatch(emptyState()); //Free the redux store after uploading
        } else {
          message.error('Failed to upload request!');
        }
      } catch (error) {
        console.error('Error uploading request: ', error);
        message.error('Failed to upload request due to an error!');
      }
    } else {
      console.log('User UID not found.');
    }
  };

  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
          <div>
            <FirebaseAuth />
          </div>
        </Modal>
        <h2>{t('requestSummary.title')}</h2>
        <div className="current-send-requests-list listing listing-boxes listing-vertical listing-background-style">
          <div className="send-request-card box-shadow">
            <div className="send-request-card-header">
              <h4>{objecInfo.name}</h4>
            </div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table className="table">
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.description')}
                    </th>
                    <td className="td">{objecInfo.description}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.pickupAddress')}</th>
                    <td className="td">{objecInfo.pickup_address}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestSummary.deliveryAddress')}
                    </th>
                    <td className="td">{objecInfo.delivery_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.timeframe')}</th>
                    <td className="td">
                      {objecInfo.dateRange
                        ? `${objecInfo.dateRange[0]} - ${objecInfo.dateRange[1]}`
                        : 'Date range not specified'}
                      <br />
                      {Object.values(objecInfo.time).join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.price')}</th>
                    <td className="td">{objecInfo.price} CHF</td>
                  </tr>
                  {/*// Only render the images row if the images array is not empty*/}
                  {objecInfo.images && objecInfo.images.length > 0 ? (
                    <tr>
                      <th className="th">{t('requestSummary.images')}</th>
                      <td className="td">
                        <Image
                          preview={{ visible: false }}
                          height={100}
                          width={100}
                          src={objecInfo.images[0]}
                          onClick={() => setVisible(true)}
                        ></Image>
                        <div style={{ display: 'none' }}>
                          <Image.PreviewGroup
                            preview={{
                              visible,
                              onVisibleChange: (vis) => setVisible(vis),
                            }}
                          >
                            {objecInfo.images.map((image) => (
                              <Image src={image} />
                            ))}
                          </Image.PreviewGroup>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="form-button-container mod-display-flex mod-flex-space-between mod-items-align-center">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'send_6_summary_back_button_click');
            }}
          />
          {uid ? (
            <ConfirmButton
              nextScreen={NEXT_SCREEN}
              onClick={() => {
                handleConfirm();
                logEvent(analytics, 'send_6_summary_confirm_button_click');
              }}
            />
          ) : (
            <div className="signin-container">
              <div className="caption">{t('requestSummary.signInMessage')}</div>
              <SignInButton
                onClick={() => {
                  showModal();
                  logEvent(analytics, 'send_6_summary_signIn_button_click');
                }}
              />
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default RequestSummary;
