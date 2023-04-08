import React from "react";
import PageLayout from './Layouts/PageLayout'

import { Typography } from 'antd';

const { Title } = Typography;

const Chat: React.FC = () => {
  return (
    <PageLayout>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Chat</Title>
    </div>
    </PageLayout>
  );
};

export default Chat;
