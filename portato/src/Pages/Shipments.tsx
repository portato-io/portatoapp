import React from "react";
import PageLayout from './PageLayout'

import { Typography } from 'antd';

const { Title } = Typography;

const Shipments: React.FC = () => {
  return (
    <PageLayout>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Shipments</Title>
    </div>
    </PageLayout>
  );
};

export default Shipments;
