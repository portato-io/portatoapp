import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function BackButton() {
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
        //left: '5%',
        width: '30vw',
        background: '#fff',
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
