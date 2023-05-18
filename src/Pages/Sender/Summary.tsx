import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal, Image } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';
import FirebaseAuth from '../../Components/FirebaseAuth';

import { useSelector } from 'react-redux';
import { IObjectInfo } from '../../type';
import { useAuth } from '../../Components/AuthProvider';
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

  const objecInfo = useSelector(
    (state: { request: IObjectInfo }) => state.request
  );

  const { uid } = useAuth();

  const handleConfirm = () => {
    if (uid) {
      const state = store.getState();
      uploadReduxStoreToFirebase(uid, state.request);
    } else {
      console.log('User UID not found.');
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
        <Modal open={isModalVisible} footer={null}>
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
        {uid ? (
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
