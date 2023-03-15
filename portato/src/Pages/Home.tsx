import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/send');
  };

  const handleDeliverClick = () => {
    navigate('/deliver');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center' }}>What do you want to do?</Title>
      <div style={{ display: 'flex', marginTop: '24px' }}>
        <Button type="primary" size="large" style={{ marginRight: '16px' }} onClick={handleSendClick}>Send</Button>
        <Button size="large" onClick={handleDeliverClick}>Deliver</Button>
      </div>
    </div>
  );
};

export default Home;