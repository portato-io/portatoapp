import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal, Image } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';
import FirebaseAuth from '../../Components/FirebaseAuth';

import { useSelector } from 'react-redux';
import { IRequestInfo } from '../../type';
import { useAuth } from '../../Components/AuthProvider';
import { uploadRequestToFirebase } from '../../linksStoreToFirebase';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const PROGRESS = 100;
const NEXT_SCREEN = '/';

const Summary: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );

  const { uid } = useAuth();

  const handleConfirm = () => {
    if (uid) {
      uploadRequestToFirebase(uid, dispatch);
    } else {
      console.log('User UID not found.');
    }
  };

  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Calculate screen height
  const containerHeight = window.innerHeight * 0.7;
  console.log(containerHeight + 'px');

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div
        style={{
          marginTop: '8%',
          height: containerHeight + 'px',
          overflowY: 'scroll',
        }}
      >
        <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
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
