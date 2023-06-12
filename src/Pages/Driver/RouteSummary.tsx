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
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const PROGRESS = 100;
const RouteSummary: React.FC = () => {
  const { t } = useContext(TranslationContext);
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
  };
  const containerHeight = window.innerHeight * 0.7;
  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div
        style={{
          marginTop: '5vh',
          height: containerHeight + 'px',
          overflowY: 'auto',
        }}
      >
        <Modal open={isModalVisible} footer={null}>
          <div>
            <FirebaseAuth />
          </div>
        </Modal>
        <div
          style={{
            marginLeft: '10vw',
            width: '80vw',
            marginTop: '5vh',
            backgroundColor: '#FFF4E4',
          }}
        >
          <Card style={{ backgroundColor: '#FFF4E4' }}>
            <Title level={2}> {t('driveSummary.title')} </Title>

            <div>
              <Title level={4}> {t('driveSummary.departureAddress')}</Title>
              <Typography> {routeInfo.departure_adress}</Typography>
            </div>
            <div>
              <Title level={4}> {t('driveSummary.destinationAddress')}</Title>
              <Typography> {routeInfo.destination_adress} </Typography>
            </div>
            <div>
              <Title level={4}> {t('driveSummary.acceptableDetour')}</Title>
              <Typography> {routeInfo.acceptable_detour} Km </Typography>
            </div>
            <div>
              <Title level={4}>{t('driveSummary.tripType')}</Title>
              <Typography> {routeInfo.type} </Typography>
            </div>

            {routeInfo.type == 'Recurrent' ? (
              <div>
                <Title level={4}> {t('driveSummary.timing')}</Title>
                <Typography>
                  {t('driveSummary.each')} {Object.values(routeInfo.days)}
                  <br />
                  {t('driveSummary.tripTime')}{' '}
                  {Object.values(routeInfo.time)[0]}{' '}
                </Typography>
              </div>
            ) : (
              <div>
                <Title level={4}> {t('driveSummary.timing')}</Title>
                <Typography>
                  {t('driveSummary.tripDates')} {routeInfo.timeRange[0]} -{' '}
                  {routeInfo.timeRange[1]} <br />
                  {t('driveSummary.tripTime')}{' '}
                  {Object.values(routeInfo.time)[0]}
                </Typography>
              </div>
            )}
            <div>
              <Title level={4}> {t('driveSummary.driveCapacity')} </Title>
              <Typography> {routeInfo.delivery_capacity} </Typography>
            </div>
          </Card>
        </div>
        {user ? (
          <ConfirmButton onClick={handleConfirm} />
        ) : (
          <SignInButton onClick={showModal} />
        )}
      </div>
      <BackButton />
    </PageLayout>
  );
};

export default RouteSummary;
