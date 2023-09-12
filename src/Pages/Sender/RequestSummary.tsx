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

  const requestInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  console.log(requestInfo);

  const { uid } = useAuth();

  const handleConfirm = async () => {
    dispatch(setStatus('unmatched'));
    console.log('About to upload request');

    if (!uid) {
      console.log('User UID not found.');
      return;
    }

    console.log('Valid uid');

    try {
      const uploadSuccess = await uploadRequestToFirebase(uid, dispatch);

      if (!uploadSuccess) {
        message.error('Failed to upload request!');
        return;
      }

      message.success('Successfully uploaded request!');

      const { userContent, supportContent } = constructEmailContent(
        requestInfo,
        uid
      );
      await sendEmailNotification(userContent, uid, '');
      await sendEmailNotification(supportContent, uid, 'support@portato.io');

      dispatch(emptyState()); // Free the redux store after uploading
    } catch (error) {
      console.error('Error uploading request:', error);
      message.error('Failed to upload request due to an error!');
    }
  };

  const constructEmailContent = (
    requestInfo: IRequestInfo,
    uid: string
  ): { userContent: string; supportContent: string } => {
    const baseContent = `
    Here is the confirmation of your recently submited transportation request:
      <table>
        <tr><th>${t('requestInfo.name')}</th><td>${requestInfo.name}</td></tr>
        <tr><th>${t('requestAddresses.pickupAddress')}</th><td>${
      requestInfo.pickup_adress
    }</td></tr>
        <tr><th>${t('requestAddresses.deliveryAddress')}</th><td>${
      requestInfo.delivery_adress
    }</td></tr>
        <tr><th>${t('requestTime.dates')}</th><td>From ${
      requestInfo.dateRange[0]
    } to ${requestInfo.dateRange[1]}</td></tr>
        <tr><th>${t('requestTime.time')}</th><td>${requestInfo.time}</td></tr>
        <tr><th>${t('requestCost.label')}</th><td>${
      requestInfo.price
    } CHF</td></tr>
        <tr><th>${t('requestSummary.weight')}</th><td>${
      requestInfo.weight
    }</td></tr>
        <tr><th>${t('requestSummary.size')}</th><td>${
      requestInfo.size
    }</td></tr>
        <tr><th>${t('requestInfo.description')}</th><td>${
      requestInfo.description
    }</td></tr>
      </table>
    `;

    const supportAdditionalContent = `
      <tr><th>requestID</th><td>${requestInfo.id}</td></tr>
      <tr><th>requestUID</th><td>${uid}</td></tr>
    `;

    return {
      userContent: baseContent,
      supportContent: baseContent + supportAdditionalContent,
    };
  };

  const sendEmailNotification = async (
    emailContent: string,
    senderUid: string,
    recipientEmail: string
  ): Promise<void> => {
    const emailBody = {
      title: t('email.requestConfirmationTitle'),
      body: emailContent,
      uid: senderUid,
      email: recipientEmail,
      admin: recipientEmail === 'support@portato.io',
    };

    const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
    try {
      const response = await fetch(
        `https://europe-west1-${projectId}.cloudfunctions.net/sendNotificationEmail`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailBody),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(`Error sending email notification: ${error}`);
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
              <h4>{requestInfo.name}</h4>
            </div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table className="table">
                  <tr>
                    <th className="th">
                      {t('requestOverview.requestList.description')}
                    </th>
                    <td className="td">{requestInfo.description}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.pickupAddress')}</th>
                    <td className="td">{requestInfo.pickup_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('requestSummary.deliveryAddress')}
                    </th>
                    <td className="td">{requestInfo.delivery_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.timeframe')}</th>
                    <td className="td">
                      {requestInfo.dateRange
                        ? `${requestInfo.dateRange[0]} - ${requestInfo.dateRange[1]}`
                        : 'Date range not specified'}
                      <br />
                      {Object.values(requestInfo.time).join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th className="th">{t('requestSummary.price')}</th>
                    <td className="td">{requestInfo.price} CHF</td>
                  </tr>
                  {/*// Only render the images row if the images array is not empty*/}
                  {requestInfo.images && requestInfo.images.length > 0 ? (
                    <tr>
                      <th className="th">{t('requestSummary.images')}</th>
                      <td className="td">
                        <Image
                          preview={{ visible: false }}
                          height={100}
                          width={100}
                          src={requestInfo.images[0]}
                          onClick={() => setVisible(true)}
                        ></Image>
                        <div style={{ display: 'none' }}>
                          <Image.PreviewGroup
                            preview={{
                              visible,
                              onVisibleChange: (vis) => setVisible(vis),
                            }}
                          >
                            {requestInfo.images.map((image) => (
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
