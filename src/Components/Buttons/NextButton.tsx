import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface NextButtonProps {
  nextScreen?: string;
  scrolling?: boolean;
  onClick?: () => void;
  disabled?: boolean; // Add this line
}

const NextButton: React.FC<NextButtonProps> = ({
  nextScreen = '/',
  onClick,
  disabled = false, // Add this line
}) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (disabled) return; // Add this line

    console.log(nextScreen);
    navigate(nextScreen);
    if (onClick) onClick();
  };

  return (
    <div className="form-button-right">
      <a
        className={`button button-solid box-shadow box-radius-default box-shadow-effect ${
          disabled ? 'disabled' : ''
        }`} // Add conditional class for styling
        onClick={handleNextClick}
      >
        {t('navigationButton.next')}
      </a>
    </div>
  );
};

export default NextButton;
