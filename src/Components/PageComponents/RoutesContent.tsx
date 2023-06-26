import React, { useContext } from 'react';
import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';
import { useTranslation } from 'react-i18next';

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
        />
      </AutoCenter>

      {/* TODO: Fetch routes and display them here, similar to send requests! */}
    </div>
  );
}

export default RoutesContent;
