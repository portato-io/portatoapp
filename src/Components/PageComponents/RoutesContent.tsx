import React, { useContext } from 'react';
import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';

const NEXT_SCREEN = '/deliver/enterRoute';
const BUTTON_TEXT = 'Create new route';

function RoutesContent() {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <div>
      <AutoCenter>
        <ButtonToCreateNewReqRoutes
          nextScreen={NEXT_SCREEN}
          text={t('driveOverview.createButtonDescription')}
          onClick={() => {
            logEvent(analytics, 'drive_1_create_new_button_clicked');
          }}
        />
      </AutoCenter>

      {/* TODO: Fetch routes and display them here, similar to send requests! */}
    </div>
  );
}

export default RoutesContent;
