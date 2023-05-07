import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

function RoutesContent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/createRoute/summary');
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
