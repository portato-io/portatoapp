import React from 'react';
import { Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Selector } from 'antd-mobile';
import { setCap } from '../../Store/actions/routeActionCreators';
import { useDispatch } from 'react-redux';
import { CAPACITY_OPTIONS } from '../../constant';

const { Title } = Typography;
const NEXT_SCREEN = '/deliver/routeSummary';
const PROGRESS = 66;

const EnterDeliveryCapacity: React.FC = () => {
  const dispatch = useDispatch();

  const handleCapChange = (e: any) => {
    dispatch(setCap(e));
  };
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
          What is your delivery capacity?
        </Title>
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
          <Selector
            columns={1}
            options={CAPACITY_OPTIONS}
            onChange={handleCapChange}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </div>
      </div>
      <NextButton nextScreen={NEXT_SCREEN} />
      <BackButton />
    </PageLayout>
  );
};

export default EnterDeliveryCapacity;
