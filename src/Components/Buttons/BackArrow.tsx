import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackArrow = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Button
      type="primary"
      icon={<ArrowLeftOutlined />}
      onClick={handleBackClick}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 999,
        padding: '0',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
      }}
    />
  );
};

export default BackArrow;
