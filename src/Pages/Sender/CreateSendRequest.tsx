import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { PlusOutlined } from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import BackArrow from '../../Components/Buttons/BackArrow';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';

const CreateSendRequest: React.FC = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(NEXT_SCREEN);
  };

  const auth = getAuth();
  const currentUser = auth.currentUser;
  let uid = 'undefined';
  if (currentUser) {
    uid = currentUser.uid;
  }

  return (
    <PageLayout>
      <BackArrow />
      <AutoCenter>
        <Title
          level={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Current send
        </Title>
        <Button
          type="default"
          size="large"
          style={{
            position: 'relative',
            height: 'auto',
            width: '50vw',
          }}
          onClick={handleSendClick}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'green',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlusOutlined
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Add Item
            </span>
          </div>
        </Button>
      </AutoCenter>
      <h1
        style={{
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Your Current Requests
      </h1>
      <FetchRequests uid={uid} heightPortion={0.5} />
    </PageLayout>
  );
};

export default CreateSendRequest;
