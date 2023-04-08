import React from "react";
import PageLayout from './Layouts/PageLayoutTest'

import { Typography } from 'antd';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <PageLayout>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={2}>Profile</Title>
    </div>
    </PageLayout>
  );
};

export default Profile;
