import React from "react";

import { Typography } from 'antd';

const { Title } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>About</Title>
    </div>
  );
};

export default About;