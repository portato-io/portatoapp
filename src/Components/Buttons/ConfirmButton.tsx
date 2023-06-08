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
        bottom: '2vh',
        right: '10vw',
        width: '45vw',
        background: '#fff',
        marginBottom: '10vh',
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
