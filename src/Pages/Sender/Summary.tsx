import React, { useState, useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography, Card, Modal, Image, message } from 'antd';
import ProgressBar from '../../Components/ProgressBar';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import SignInButton from '../../Components/Buttons/SignInButton';
import FirebaseAuth from '../../Components/FirebaseAuth';
import { TranslationContext } from '../../Contexts/TranslationContext';

import { useSelector } from 'react-redux';
import { IRequestInfo } from '../../type';
import { useAuth } from '../../Components/AuthProvider';
import { uploadRequestToFirebase } from '../../linksStoreToFirebase';
import { useDispatch } from 'react-redux';
import { emptyState } from '../../Store/actions/requestActionCreators';

const { Title } = Typography;
const PROGRESS = 100;
const NEXT_SCREEN = '/createSendRequest';

const Summary: React.FC = () => {
  const { t } = useContext(TranslationContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const objecInfo = useSelector(
    (state: { request: IRequestInfo }) => state.request
  );
  const state = useSelector((state) => state);
  console.log(state); // prints all states of the store

  const { uid } = useAuth();

  const handleConfirm = async () => {
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
      <ProgressBar progress={PROGRESS} />
      <div className="form-and-buttons-content-container">
        <div className="form-content-container">
          <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
            <div>
              <FirebaseAuth />
            </div>
          </Modal>
          <Card
            bordered={true}
            style={{
              marginTop: '20px',
              marginBottom: '20px',
              backgroundColor: '#FFF4E4',
              borderRadius: '20px',
            }}
          >
            <Title level={2}> {t('requestSummary.title')} </Title>
            <div>
              <Title level={4}> {objecInfo.name}</Title>
              <Typography>
                {objecInfo.description}
                <br />
                {t('requestSummary.size')} {objecInfo.size} |{'    '}
                {t('requestSummary.weight')} {objecInfo.weight}
              </Typography>
            </div>
            <div>
              <Title level={4}> {t('requestSummary.pickupAddress')}</Title>
              <Typography> {objecInfo.pickup_adress} </Typography>
            </div>
            <div>
              <Title level={4}> {t('requestSummary.deliveryAddress')}</Title>
              <Typography> {objecInfo.delivery_adress} </Typography>
            </div>
            <div>
              <Title level={4}>{t('requestSummary.timeframe')}</Title>
              <Typography>
                {' '}
                {t('requestSummary.possibleDates')} {objecInfo.dateRange[0]} -{' '}
                {objecInfo.dateRange[1]}
                <br />
                {t('requestSummary.possibleTimes')} {objecInfo.time}{' '}
              </Typography>
            </div>
            <div>
              <Title level={4}> {t('requestSummary.price')}</Title>
              <Typography> {objecInfo.price} CHF </Typography>
            </div>
            <div>
              <Title level={4}> {t('requestSummary.images')}</Title>
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
            </div>
          </Card>
        </div>
        <div className="form-button-container">
          <BackButton />
          {uid ? (
            <ConfirmButton nextScreen={NEXT_SCREEN} onClick={handleConfirm} />
          ) : (
            <SignInButton onClick={showModal} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Summary;
