import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';

const NEXT_SCREEN = '/deliver/enterRoute';
const BUTTON_TEXT = 'Create new route';

function RoutesContent() {
  return (
    <div>
      <AutoCenter>
        <div style={{ height: '50px' }}></div>
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
        Your Current Routes
      </h1>

      {/* TODO: Fetch routes and display them here, similar to send requests! */}
    </div>
  );
}

export default RoutesContent;
