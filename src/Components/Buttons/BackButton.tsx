import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function BackButton({ scrolling = false }: any) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div
      className="div_button_next"
      style={{
        background: '#fff',
      }}
    >
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
