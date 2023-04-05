import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageLayout from "./PageLayout"

const { Title } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/enterObjInfo');
  };

  const handleDeliverClick = () => {
    navigate('/deliver');
  };

  return (
    <PageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Title level={2} style={{ textAlign: 'center'}}>What do you want to do?</Title>
        <div style={{ display: 'flex', flexDirection:"row", marginTop: '24px' }}>
          <Button type="primary" size="large" style={{ marginRight: '16px' }} onClick={handleSendClick}>Send</Button>
          <Button size="large" onClick={handleDeliverClick}>Deliver</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
