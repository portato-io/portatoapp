import { AutoCenter, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { ButtonToCreateNewReqRoutes } from '../Buttons/ButtonToCreateNewReqRoutes';

const NEXT_SCREEN = '/deliver/enterRoute';

function RoutesContent() {
  return (
    <div style={{ height: '100vh' }}>
      <AutoCenter>
        <ButtonToCreateNewReqRoutes nextScreen={NEXT_SCREEN} />
      </AutoCenter>
    </div>
  );
}
export default RoutesContent;
