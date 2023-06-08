import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export function ButtonToCreateNewReqRoutes({
  nextScreen = '/',
  text = '',
}: any) {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(nextScreen);
  };
  return (
    <Button
      type="default"
      size="large"
      style={{
        position: 'relative',
        height: 'auto',
        width: '50vw',
      }}
      onClick={handleSendClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'green',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlusOutlined
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{text}</span>
      </div>
    </Button>
  );
}
