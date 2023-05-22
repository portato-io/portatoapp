import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NextButton({ nextScreen = '/', scrolling = false }: any) {
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
        bottom: '2vh',
        right: '-45vw',
        width: '45vw',
        background: 'white',
        marginBottom: scrolling ? '0vh' : '10vh',
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
