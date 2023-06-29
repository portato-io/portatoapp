import React, { useContext, useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';

import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import FirebaseAuth from '../../Components/FirebaseAuth';
import { uploadRouteToFirebase } from '../../linksStoreToFirebase';
import { IRouteInfo } from '../../type';
import { useSelector, useDispatch } from 'react-redux';
import { emptyState } from '../../Store/actions/requestActionCreators';
import { useTranslation } from 'react-i18next';
require('../../CSS/Send.css');
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const { Title } = Typography;
const PROGRESS = 100;
const NEXT_SCREEN = '/deliver';

const RouteSummary: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [isModalVisible, setIsModalVisible] = useState(false);
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  console.log(Object.values(routeInfo.time)[0]);
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

  const handleConfirm = () => {
    console.log('In handle confirm.');
    const currentUser = auth.currentUser;
    if (currentUser) {
      const uid = auth.currentUser?.uid; // Add the optional chaining operator here
      if (uid) {
        uploadRouteToFirebase(uid, dispatch);
      } else {
        console.log('User UID not found.');
      }
    } else {
      // Handle the case when no user is signed in
      console.log('No user is signed in.');
    }
    dispatch(emptyState()); //Free the redux store after uploading
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
                <table>
                  <tr>
                    <th>{t('driveSummary.departureAddress')}</th>
                    <td>{routeInfo.departure_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.destinationAddress')}</th>
                    <td>{routeInfo.destination_adress}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.acceptableDetour')}</th>
                    <td>{routeInfo.acceptable_detour} Km </td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.driveCapacity')}</th>
                    <td>{routeInfo.delivery_capacity}</td>
                  </tr>
                  <tr>
                    <th>{t('driveSummary.tripType')}</th>
                    <td>{routeInfo.type}</td>
                  </tr>
                  <tr>
                    <th>
                      <th>{t('driveSummary.timing')}</th>
                    </th>
                    <td>
                      {routeInfo.type == t('driveTime.recurringRide') ? (
                        <div>
                          <Typography>
                            {t('driveSummary.each')}{' '}
                            {Object.values(routeInfo.days)}
                            <br />
                            {t('driveSummary.tripTime')}{' '}
                            {Object.values(routeInfo.time)[0]}{' '}
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Typography>
                            {routeInfo.timeRange} <br />
                            {Object.values(routeInfo.time)[0]}
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
          <BackButton />
          {user ? (
            <ConfirmButton
              nextScreen={NEXT_SCREEN}
              onClick={() => {
                handleConfirm();
                logEvent(analytics, 'drive_5_summary_confirm_clicked');
              }}
            />
          ) : (
            <SignInButton
              onClick={() => {
                showModal();
                logEvent(analytics, 'drive_5_summary_sign_in_clicked');
              }}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default RouteSummary;
