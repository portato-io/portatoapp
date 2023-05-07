import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

const NEXT_SCREEN = 'deliver/enterRoute';

function RoutesContent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(NEXT_SCREEN);
  };
  return (
    <div style={{ height: '100vh' }}>
      <Button
        size="large"
        //style={{ display:'flex', left: '30%', top: '20%' }}
        onClick={handleClick}
      >
        Create new Route
      </Button>
    </div>
  );
}
export default RoutesContent;
