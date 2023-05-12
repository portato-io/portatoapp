import React from 'react';
import { Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import SwitchContainer from '../../Components/SwitchContainer';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';

const { Title } = Typography;
const PROGRESS = 50;
const NEXT_SCREEN = '/deliver/routeSummary';

const EnterDeliveryTime: React.FC = () => {
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
        <Title
          level={4}
          style={{
            position: 'absolute',
            top: '5vh',
            textAlign: 'center',
            marginBottom: '5vh',
          }}
        >
          When are you driving?
        </Title>
        <SwitchContainer />
        <NextButton nextScreen={NEXT_SCREEN} />
        <BackButton />
      </div>
    </PageLayout>
  );
};

export default EnterDeliveryTime;
