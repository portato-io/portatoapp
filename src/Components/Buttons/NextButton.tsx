import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TranslationContext } from '../../Contexts/TranslationContext';

function NextButton({ nextScreen = '/', scrolling = false }: any) {
  const { t } = useContext(TranslationContext);
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
        right: '10vw',
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
        {t('navigationButton.next')}
      </Button>
    </div>
  );
}
export default NextButton;
