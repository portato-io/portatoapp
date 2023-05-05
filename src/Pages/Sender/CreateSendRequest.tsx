import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Title } = Typography;
const progress = 25;
const NEXT_SCREEN = "/createSendRequest/enterObjInfo";

const CreateSendRequest: React.FC = () => {

  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(NEXT_SCREEN);
  };
  return (
    <PageLayout>
      <Title
        level={4}
        style={{ position: 'absolute', left: '26%', top: '10%' }}
      >
        Current send requests{' '}
      </Title>
      <Button
        type="primary"
        size="large"
        style={{ position: 'absolute', left: '30%', top: '20%' }}
        onClick={handleSendClick}
      >
        Create new request
      </Button>
    </PageLayout>
  );
};

export default CreateSendRequest;
