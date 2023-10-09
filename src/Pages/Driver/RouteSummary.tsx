import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Modal, message } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';

import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import FirebaseAuth from '../../Components/FirebaseAuth';
import { useAuth } from '../../Components/AuthProvider';
import { uploadRouteToFirebase } from '../../linksStoreToFirebase';
import { IRouteInfo } from '../../type';
import { useSelector, useDispatch } from 'react-redux';
import { emptyState } from '../../Store/actions/requestActionCreators';
import { useTranslation } from 'react-i18next';
require('../../CSS/Send.css');
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const PROGRESS = 100;
const NEXT_SCREEN = '/deliver';

const RouteSummary: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [isModalVisible, setIsModalVisible] = useState(false);
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User signed in:', currentUser); // Added console log
        setUser(currentUser);
      } else {
        console.log('User signed out'); // Added console log
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { uid } = useAuth();

  const handleConfirm = async () => {
    console.log('About to upload route');

    if (!uid) {
      console.log('User UID not found.');
      return;
    }

    console.log('Valid uid');

    try {
      const uploadSuccess = await uploadRouteToFirebase(uid, dispatch);

      if (!uploadSuccess) {
        message.error('Failed to upload request!');
        return;
      }

      message.success('Successfully uploaded request!');

      const { userContent, supportContent } = constructEmailContent(
        routeInfo,
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
    routeInfo: IRouteInfo,
    uid: string
  ): { userContent: string; supportContent: string } => {
    let daysDisplay = 'N/A';
    let timeDisplay = 'N/A';

    if (routeInfo.days) {
      daysDisplay = Object.values(routeInfo.days).join(', ');
    }

    if (routeInfo.time) {
      timeDisplay = Object.values(routeInfo.time).join(', ');
    }

    const recurringRideContent = `
      <tr><th style="text-align:left;">${t(
        'driveSummary.each'
      )} </th><td>${daysDisplay}<br />
      <tr><th style="text-align:left;">${t(
        'driveSummary.tripTime'
      )} </th><td>${timeDisplay}
    `;

    const nonRecurringRideContent = `
      <tr><th style="text-align:left;">${t('driveSummary.tripDate')} </th><td>${
      routeInfo.timeRange
    } <br />
      <tr><th style="text-align:left;">${t(
        'driveSummary.tripTime'
      )} </th><td>${timeDisplay}
    `;

    const rideSpecificContent =
      routeInfo.type === t('driveTime.recurringRide')
        ? recurringRideContent
        : nonRecurringRideContent;

    const baseContent = `
      ${t('driveSummary.notificationEmail.requestConfirmationBody')}
      <br>  
      <table>
        <tr><th style="text-align:left;">${t(
          'driveSummary.departureAddress'
        )}:</th><td>${routeInfo.departure_adress}</td></tr>
        <tr><th style="text-align:left;">${t(
          'driveSummary.destinationAddress'
        )}:</th><td>${routeInfo.destination_adress}</td></tr>
        <tr><th style="text-align:left;">${t('requestSummary.size')}</th><td>${
      routeInfo.delivery_capacity
    }</td></tr>
        <tr><th style="text-align:left;">${t(
          'driveSummary.acceptableDetour'
        )}:</th><td>${routeInfo.acceptable_detour} Km</td></tr>
        <tr><td colspan="2">${rideSpecificContent}</td></tr>
      </table>
      <br>
      ${t('driveSummary.notificationEmail.salutations')}
    `;

    const supportAdditionalContent = `
      <table>
        <tr><th>requestID</th><td>${routeInfo.id}</td></tr>
        <tr><th>requestUID</th><td>${uid}</td></tr>
      </table>
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
      title: t('driveSummary.notificationEmail.requestConfirmationTitle'),
      greetings: t('driveSummary.notificationEmail.greetings'),
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
        <h2>{t('driveSummary.title')}</h2>
        <div className="current-send-requests-list listing listing-boxes listing-vertical listing-background-style">
          <div className="send-request-card box-shadow">
            <div className="send-request-card-header"></div>
            <div className="send-request-card-content">
              <div className="table-wrapper">
                <table className="table">
                  <tr>
                    <th className="th">{t('driveSummary.departureAddress')}</th>
                    <td className="td">{routeInfo.departure_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      {t('driveSummary.destinationAddress')}
                    </th>
                    <td className="td">{routeInfo.destination_adress}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.acceptableDetour')}</th>
                    <td className="td">{routeInfo.acceptable_detour} Km </td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.driveCapacity')}</th>
                    <td className="td">{routeInfo.delivery_capacity}</td>
                  </tr>
                  <tr>
                    <th className="th">{t('driveSummary.tripType')}</th>
                    <td className="td">{routeInfo.type}</td>
                  </tr>
                  <tr>
                    <th className="th">
                      <th className="th">{t('driveSummary.timing')}</th>
                    </th>
                    <td className="td">
                      {routeInfo.type == t('driveTime.recurringRide') ? (
                        <div>
                          <Typography>
                            {t('driveSummary.each')}{' '}
                            {routeInfo.days
                              ? Object.values(routeInfo.days).join(', ')
                              : 'N/A'}
                            <br />
                            {t('driveSummary.tripTime')}{' '}
                            {routeInfo.time
                              ? Object.values(routeInfo.time).join(', ')
                              : 'N/A'}{' '}
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography>
                            {routeInfo.timeRange} <br />
                            {routeInfo.time
                              ? Object.values(routeInfo.time).join(', ')
                              : 'N/A'}{' '}
                          </Typography>
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'drive_4_summary_back_button_click');
            }}
          />
          {user ? (
            <ConfirmButton
              nextScreen={NEXT_SCREEN}
              onClick={() => {
                handleConfirm();
                logEvent(analytics, 'drive_4_summary_confirm_button_click');
              }}
            />
          ) : (
            <SignInButton
              onClick={() => {
                showModal();
                logEvent(analytics, 'drive_4_summary_signIn_button_click');
              }}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default RouteSummary;
