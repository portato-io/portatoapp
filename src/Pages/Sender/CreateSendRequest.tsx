import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { PlusOutlined } from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';

const CreateSendRequest: React.FC = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  let uid = 'undefined';
  if (currentUser) {
    uid = currentUser.uid;
  }

  return (
    <PageLayout>
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
        <ButtonToCreateNewReqRoutes nextScreen={NEXT_SCREEN} />
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
