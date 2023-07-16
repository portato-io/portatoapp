import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import FetchRequests from '../../Components/FetchRequests';
import { ButtonToCreateNewReqRoutes } from '../../Components/Buttons/ButtonToCreateNewReqRoutes';
import { useAuth } from '../../Components/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const NEXT_SCREEN = '/createSendRequest/enter_request_name_desc';

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
              logEvent(analytics, 'send_0_overview_createNew_button_click');
            }}
          />
        </div>
      </section>

      {uid !== 'undefined' ? (
        <>
          <section className="section">
            <FetchRequests uid={uid} heightPortion={0.5} />
          </section>
        </>
      ) : null}
    </PageLayout>
  );
};

export default CreateSendRequest;
