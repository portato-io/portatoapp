import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

function NextButton({ nextScreen = '/', scrolling = false }: any) {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const navigate = useNavigate();
  const handleNextClick = () => {
    console.log(nextScreen);
    navigate(nextScreen);
  };
  return (
    <div className="form-button-right">
      <a
        className="button button-solid box-shadow box-radius-default box-shadow-effect"
        onClick={handleNextClick}
      >
        {t('navigationButton.next')}
      </a>
    </div>
  );
}
export default NextButton;
