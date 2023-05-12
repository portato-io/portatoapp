import React from 'react';
import { Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import ConfirmButton from '../../Components/Buttons/ConfirmButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';

const { Title } = Typography;
const PROGRESS = 100;
const RouteSummary: React.FC = () => {
  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
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
          Summary
        </Title>
      </div>
      <ConfirmButton />
      <BackButton />
    </PageLayout>
  );
};

export default RouteSummary;
