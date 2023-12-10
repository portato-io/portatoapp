import { useNavigate } from 'react-router-dom';
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
      <a
        className="button button-solid box-shadow box-radius-default box-shadow-effect"
        onClick={handleConfirmClick}
      >
        {t('navigationButton.confirm')}
      </a>
    </div>
  );
};
export default ConfirmButton;
