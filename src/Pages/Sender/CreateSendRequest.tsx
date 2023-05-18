import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { getAuth } from 'firebase/auth';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';
import BackArrow from '../../Components/Buttons/BackArrow';
import { useAuth } from '../../Components/AuthProvider';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';
const BUTTON_TEXT = 'Create new request';

const CreateSendRequest: React.FC = () => {
  const { uid } = useAuth();

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
        <ButtonToCreateNewReqRoutes
          nextScreen={NEXT_SCREEN}
          text={BUTTON_TEXT}
        />
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
