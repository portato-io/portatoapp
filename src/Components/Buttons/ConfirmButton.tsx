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
    <div className="form-button-right">
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
