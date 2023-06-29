import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { Typography } from 'antd';
import { AutoCenter } from 'antd-mobile';
import FetchRequests from '../../Components/FetchRequests';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';
import { useAuth } from '../../Components/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';

const CreateSendRequest: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const { uid } = useAuth();

  return (
    <PageLayout>
      <section className="section">
        <h2>{t('requestOverview.newTitle')}</h2>
        <div>
          <ButtonToCreateNewReqRoutes
            nextScreen={NEXT_SCREEN}
            text={t('requestOverview.createButtonDescription')}
            onClick={() => {
              logEvent(analytics, 'send_1_create_new_button_clicked');
            }}
          />
        </div>
      </section>

      {uid !== 'undefined' ? (
        <>
          <FetchRequests uid={uid} heightPortion={0.5} />
        </>
      ) : null}
    </PageLayout>
  );
};

export default CreateSendRequest;
