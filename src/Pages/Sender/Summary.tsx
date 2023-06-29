import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal, Image, message } from 'antd';
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

const { Title } = Typography;
const PROGRESS = 100;
const NEXT_SCREEN = '/createSendRequest';

const Summary: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

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
                <table>
                  <tr>
                    <th>{t('requestOverview.requestList.description')}</th>
                    <td>{objecInfo.description}</td>
                  </tr>
                  <tr>
                    <th>{t('requestSummary.pickupAddress')}</th>
                    <td>{objecInfo.pickup_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('requestSummary.deliveryAddress')}</th>
                    <td>{objecInfo.delivery_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('requestSummary.timeframe')}</th>
                    <td>
                      {objecInfo.dateRange[0]} - {objecInfo.dateRange[1]}
                      <br />
                      {Object.values(objecInfo.time)[0]}{' '}
                    </td>
                  </tr>
                  <tr>
                    <th>{t('requestSummary.price')}</th>
                    <td>{objecInfo.price} CHF</td>
                  </tr>
                  <tr>
                    <th>{t('requestSummary.images')}</th>
                    <td>
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
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton />
          {uid ? (
            <ConfirmButton
              nextScreen={NEXT_SCREEN}
              onClick={() => {
                handleConfirm();
                logEvent(analytics, 'send_6_summary_confirm_clicked');
              }}
            />
          ) : (
            <SignInButton
              onClick={() => {
                showModal();
                logEvent(analytics, 'send_6_summary_sign_in_clicked');
              }}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Summary;
