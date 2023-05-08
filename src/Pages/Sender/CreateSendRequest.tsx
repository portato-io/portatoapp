import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { AutoCenter } from 'antd-mobile';
import UserRequests from '../../Components/PageComponents/userRequests';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const NEXT_SCREEN = '/createSendRequest/enterObjInfo';

const CreateSendRequest: React.FC = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(NEXT_SCREEN);
  };
  return (
    <PageLayout>
      <AutoCenter>
        <Title
          level={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Current send
        </Title>
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
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Add Item
            </span>
          </div>
        </Button>
      </AutoCenter>
      <UserRequests heightPortion={0.5} />
    </PageLayout>
  );
};

export default CreateSendRequest;
