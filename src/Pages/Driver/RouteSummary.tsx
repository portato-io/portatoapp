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

const progress = 100;
const { Title } = Typography;
const PROGRESS = 100;
const RouteSummary: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div
        style={{
          marginLeft: '10%',
          width: '80%',
          marginTop: '20%',
          backgroundColor: '#FFF4E4',
        }}
      >
        <Card>
          <Title level={2}> Summary </Title>
        </Card>
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
