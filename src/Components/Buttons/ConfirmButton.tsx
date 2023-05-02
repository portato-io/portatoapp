import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ConfirmButton = ({ onClick, nextScreen = '/' }: any) => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    console.log(nextScreen);
    onClick();
    navigate('/');
  };
  return (
    <div
      className="div_button_next"
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '45%',
        width: '50%',
        background: '#fff',
      }}
    >
      <Button
        type="primary"
        size="large"
        onClick={handleConfirmClick}
        style={{ width: '100%' }}
      >
        Confirm
      </Button>
    </div>
  );
};
export default ConfirmButton;
