import React, { useContext } from 'react';
import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';
import { TranslationContext } from '../../Contexts/TranslationContext';

const NEXT_SCREEN = '/deliver/enterRoute';
const BUTTON_TEXT = 'Create new route';

function RoutesContent() {
  const { t } = useContext(TranslationContext);
  return (
    <div>
      <AutoCenter>
        <ButtonToCreateNewReqRoutes
          nextScreen={NEXT_SCREEN}
          text={t('driveOverview.newTitle')}
        />
      </AutoCenter>

      {/* TODO: Fetch routes and display them here, similar to send requests! */}
    </div>
  );
}

export default RoutesContent;
