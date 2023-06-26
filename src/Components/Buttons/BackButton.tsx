import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

function BackButton({ scrolling = false }: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
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
