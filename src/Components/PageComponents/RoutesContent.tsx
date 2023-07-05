import React, { useContext } from 'react';
import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import { useAuth } from '../AuthProvider';
import FetchRoutes from '../FetchRoutes';

const NEXT_SCREEN = '/deliver/enterRoute';
const BUTTON_TEXT = 'Create new route';

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
          <FetchRoutes uid={uid} heightPortion={0.5} />
        </>
      ) : null}
    </div>
  );
}

export default RoutesContent;
