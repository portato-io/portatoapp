import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TranslationContext } from '../../Contexts/TranslationContext';

const ConfirmButton = ({ nextScreen = '/' }: any) => {
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate(nextScreen);
  };
  return (
    <div className="form-button-right">
      <Button
        type="primary"
        size="large"
        onClick={handleConfirmClick}
        style={{ width: '100%' }}
      >
        {t('navigationButton.confirm')}
      </Button>
    </div>
  );
};
export default ConfirmButton;
