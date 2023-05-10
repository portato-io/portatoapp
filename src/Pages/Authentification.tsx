import React from 'react';

import { Typography } from 'antd';

const { Title } = Typography;

const Authentification: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Title level={2}>Authentification</Title>
    </div>
  );
};

export default Authentification;
