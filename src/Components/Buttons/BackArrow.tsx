import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const BackArrow = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <a className="text-link icon-link back-link" onClick={handleBackClick}>
      <i className="icon icon-arrow-left"></i>
      {t('general.back')}
    </a>
  );
};

export default BackArrow;
