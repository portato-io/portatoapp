import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';
import { useAuth } from '../../Components/AuthProvider';
import AddressAutocomplete from '../../Components/AutoComplete';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';
const BUTTON_TEXT = 'Create new request';

const CreateSendRequest: React.FC = () => {
  const { uid } = useAuth();

  return (
    <PageLayout>
      <AddressAutocomplete />
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
      {uid !== 'undefined' ? (
        <>
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
        </>
      ) : null}
    </PageLayout>
  );
};

export default CreateSendRequest;
