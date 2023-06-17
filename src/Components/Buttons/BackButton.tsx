import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TranslationContext } from '../../Contexts/TranslationContext';

function BackButton({ scrolling = false }: any) {
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="form-button-left">
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
