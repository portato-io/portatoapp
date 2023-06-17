import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TranslationContext } from '../../Contexts/TranslationContext';
import NavigationButtons from './NavigationButtons';

function BackButton({ scrolling = false }: any) {
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
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
        onClick={handleBackClick}
        style={{ width: '100%' }}
      >
        {t('navigationButton.back')}
      </Button>
    </div>
  );
}
export default BackButton;
