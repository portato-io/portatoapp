import React from "react";

import { Typography } from 'antd';

const { Title } = Typography;

const Chat: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Chat</Title>
    </div>
  );
};

export default Chat;