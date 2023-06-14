import React from 'react';
import { Typography } from 'antd';
import PageLayout from './Layouts/PageLayoutTest';
require('../CSS/PortatoStyleSheet.css');

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="temp-home-page-css">
        <Title level={2} style={{ textAlign: 'center' }}>
          This is our Home page
        </Title>
      </div>
    </PageLayout>
  );
};

export default Home;
