import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal, Image } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';

import { useSelector } from 'react-redux';
import { ObjectInfoState, IObjectInfo } from '../../type';

import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import FirebaseAuth from '../../Components/FirebaseAuth';
import { uploadReduxStoreToFirebase } from '../../linksStoreToFirebase';
import { store } from '../../index';

const { Title } = Typography;
const progress = 100;
const NEXT_SCREEN = '/';

const Summary: React.FC = () => {
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
  const objecInfo = useSelector(
    (state: { request: IObjectInfo }) => state.request
  );
  const [user, setUser] = useState<User | null>(null);
  console.log('BAAAH', objecInfo);

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
        uploadReduxStoreToFirebase(uid, state);
      } else {
        console.log('User UID not found.');
      }
    } else {
      // Handle the case when no user is signed in
      console.log('No user is signed in.');
    }
  };
  const [visible, setVisible] = useState(false);
  // Calculate screen height
  const containerHeight = window.innerHeight * 0.7;
  console.log(containerHeight + 'px');

  return (
    <PageLayout>
      <ProgressBar progress={progress} />
      <div
        style={{
          marginTop: '8%',
          height: containerHeight + 'px',
          overflowY: 'scroll',
        }}
      >
        <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div>
            <FirebaseAuth />
          </div>
        </Modal>
        <Card
          bordered={true}
          style={{
            marginLeft: '10%',
            width: '80%',
            marginTop: '10vh',
            backgroundColor: '#FFF4E4',
          }}
        >
          <Title level={2}> Summary </Title>
          <div>
            <Title level={4}> {objecInfo.name}</Title>
            <Typography>
              {' '}
              {objecInfo.description} / Size: {objecInfo.size} / Weight:{' '}
              {objecInfo.weight}
            </Typography>
          </div>
          <div>
            <Title level={4}> Pickup address</Title>
            <Typography> {objecInfo.pickup_adress} </Typography>
          </div>
          <div>
            <Title level={4}> Delivery address</Title>
            <Typography> {objecInfo.delivery_adress} </Typography>
          </div>
          <div>
            <Title level={4}>
              {' '}
              {objecInfo.dateRange[0]} - {objecInfo.dateRange[1]}
            </Title>
            <Typography> In: {objecInfo.time} </Typography>
          </div>
          <div>
            <Title level={4}> Price</Title>
            <Typography> {objecInfo.price} CHF </Typography>
          </div>
          <div>
            <Title level={4}> Images</Title>
            <Image
              preview={{ visible: false }}
              height={100}
              width={100}
              src={objecInfo.images[0]}
              onClick={() => setVisible(true)}
            >
              {' '}
            </Image>
            <div style={{ display: 'none' }}>
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                {objecInfo.images.map((image) => (
                  <Image src={image} />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
        </Card>
        {user ? (
          <ConfirmButton onClick={handleConfirm} />
        ) : (
          <SignInButton onClick={showModal} />
        )}
        <BackButton />
      </div>
    </PageLayout>
  );
};

export default Summary;
