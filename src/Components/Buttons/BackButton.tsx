import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className="form-button-left">
      <a
        className="button button-border button-border-light box-shadow box-radius-default box-shadow-effect"
        {...props}
        onClick={handleBackClick}
      >
        {t('navigationButton.back')}
      </a>
    </div>
  );
};

export default BackButton;
