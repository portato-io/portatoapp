import React from "react";

import { Typography } from 'antd';

const { Title } = Typography;

const Send: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Title level={2}>Send</Title>
    </div>
  );
};

export default Send;