import React, { useEffect, useState } from 'react';
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
import { store } from '../../index';
import { IRouteInfo } from '../../type';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const PROGRESS = 100;
const RouteSummary: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const routeInfo = useSelector((state: { route: IRouteInfo }) => state.route);
  console.log(Object.values(routeInfo.time)[0]);

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
        const state = store.getState();
        uploadRouteToFirebase(uid, state.route);
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
          marginTop: '8vh',
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
            marginTop: '10vh',
            backgroundColor: '#FFF4E4',
          }}
        >
          <Card style={{ backgroundColor: '#FFF4E4' }}>
            <Title level={2}> Summary </Title>

            <div>
              <Title level={4}> Departure address</Title>
              <Typography> {routeInfo.departure_adress}</Typography>
            </div>
            <div>
              <Title level={4}> Destination address</Title>
              <Typography> {routeInfo.destination_adress} </Typography>
            </div>
            <div>
              <Title level={4}> Acceptable detour</Title>
              <Typography> {routeInfo.acceptable_detour} Km </Typography>
            </div>
            <div>
              <Title level={4}>Type</Title>
              <Typography> {routeInfo.type} </Typography>
            </div>
            <div>
              <Title level={4}> Time</Title>
              <Typography> {Object.values(routeInfo.time)[0]} </Typography>
            </div>
            {routeInfo.type == 'Recurrent' ? (
              <div>
                <Title level={4}> Days</Title>
                <Typography> {Object.values(routeInfo.days)} </Typography>
              </div>
            ) : (
              <div>
                <Title level={4}> Time Range</Title>
                <Typography> COMING </Typography>
              </div>
            )}
            <div>
              <Title level={4}> Capacity</Title>
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
