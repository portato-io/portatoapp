import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmButton = ({ nextScreen = '/', onClick }: any) => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    if (onClick) onClick(); // Call the onClick function prop if it exists
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
