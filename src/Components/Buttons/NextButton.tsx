import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NextButton({ nextScreen = '/' }: any) {
  const navigate = useNavigate();
  const handleNextClick = () => {
    console.log(nextScreen);
    navigate(nextScreen);
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
        onClick={handleNextClick}
        style={{ width: '100%' }}
      >
        Next
      </Button>
    </div>
  );
}
export default NextButton;
