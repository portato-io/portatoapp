import React from "react";

import { Typography } from 'antd';

const { Title } = Typography;

const Deliver: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Deliver</Title>
    </div>
  );
};

export default Deliver;