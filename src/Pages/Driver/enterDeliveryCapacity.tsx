import React from 'react';
import { Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';

const { Title } = Typography;

const EnterDeliveryCapacity: React.FC = () => {
  return (
    <PageLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Title level={2} style={{ textAlign: 'center' }}>
          Cap
        </Title>
      </div>
    </PageLayout>
  );
};

export default EnterDeliveryCapacity;
