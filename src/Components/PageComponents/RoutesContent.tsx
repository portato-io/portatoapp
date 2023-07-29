import React from 'react';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import { useAuth } from '../AuthProvider';
import FetchRoutes from '../FetchRoutes';

const NEXT_SCREEN = '/deliver/enterRoute';

function RoutesContent() {
  const { uid } = useAuth();

  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <div>
      <ButtonToCreateNewReqRoutes
        nextScreen={NEXT_SCREEN}
        text={t('driveOverview.createButtonDescription')}
        onClick={() => {
          logEvent(analytics, 'drive_0_overview_createNew_button_click');
        }}
      />
      {uid !== 'undefined' ? (
        <>
          <FetchRoutes uid={uid} />
        </>
      ) : null}
    </div>
  );
}

export default RoutesContent;
