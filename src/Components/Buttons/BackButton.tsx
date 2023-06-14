import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function BackButton({ scrolling = false }: any) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="form-button-main form-button-left">
      <Button
        type="default"
        size="large"
        onClick={handleBackClick}
        style={{ width: '100%' }}
      >
        Back
      </Button>
    </div>
  );
}
export default BackButton;
