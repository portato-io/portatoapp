import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NextButton({ nextScreen = '/', scrolling = false }: any) {
  const navigate = useNavigate();
  const handleNextClick = () => {
    console.log(nextScreen);
    navigate(nextScreen);
  };
  return (
    <div className="form-button-main form-button-right">
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
