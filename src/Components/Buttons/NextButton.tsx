import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NextButton({ nextScreen = '/', scrolling = false }: any) {
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate(nextScreen);
  };
  return (
    <div
      className="div_button_next"
      style={{
        background: 'white',
      }}
    >
      <Button
        type="primary"
        size="large"
        onClick={handleNextClick}
        style={{ width: '100%' }}
      >
        Next
      </Button>
    </div>
  );
}
export default NextButton;
