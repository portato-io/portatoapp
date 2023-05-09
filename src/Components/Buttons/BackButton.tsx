import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function BackButton({ scrolling = false }: any) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(-1);
  };
  return (
    <div
      className="div_button_next"
      style={{
        position: 'absolute',
        bottom: '2vh',
        left: scrolling ? '0vw' : '10%',
        width: '30vw',
        background: '#fff',
        marginBottom: scrolling ? '0vh' : '10vh',
      }}
    >
      <Button
        type="default"
        size="large"
        onClick={handleNextClick}
        style={{ width: '100%' }}
      >
        Back
      </Button>
    </div>
  );
}
export default BackButton;
