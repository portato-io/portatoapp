import React, { useContext } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';
import { useAuth } from '../../Components/AuthProvider';
import AddressAutocomplete from '../../Components/AutoComplete';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';

const CreateSendRequest: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { uid } = useAuth();

  return (
    <PageLayout>
      <AutoCenter>
        <ButtonToCreateNewReqRoutes
          nextScreen={NEXT_SCREEN}
          text={t('requestOverview.createButtonDescription')}
        />
      </AutoCenter>

      {uid !== 'undefined' ? (
        <>
          <FetchRequests uid={uid} heightPortion={0.5} />
        </>
      ) : null}
    </PageLayout>
  );
};

export default CreateSendRequest;
