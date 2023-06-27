import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NextButtonProps {
  nextScreen?: string;
  scrolling?: boolean;
  onClick?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({
  nextScreen = '/',
  scrolling = false,
  onClick,
}) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();

  const handleNextClick = () => {
    console.log(nextScreen);
    navigate(nextScreen);
    if (onClick) onClick();
  };

  return (
    <div className="form-button-right">
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
};

export default NextButton;
