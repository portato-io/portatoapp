import React, { useContext } from 'react';
import { Typography } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import SwitchContainer from '../../Components/SwitchContainer';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Tabs, Calendar, Selector } from 'antd-mobile';
import SingleTripContent from '../../Components/PageComponents/SingleTripContent';
import RecurrentTripContent from '../../Components/PageComponents/RecurrentTripContent';
import { TranslationContext } from '../../Contexts/TranslationContext';

const { Title } = Typography;
const PROGRESS = 50;
const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

const EnterDeliveryTime: React.FC = () => {
  const { t } = useContext(TranslationContext);

  return (
    <PageLayout>
      <ProgressBar progress={PROGRESS} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15vh',
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
          {t('driveTime.title')}
        </Title>
      </div>
      <div>
        <Tabs>
          <Tabs.Tab title="Single trip" key="single">
            <SingleTripContent />
          </Tabs.Tab>
          <Tabs.Tab title="Recurring trip" key="recur">
            <RecurrentTripContent />
          </Tabs.Tab>
        </Tabs>
      </div>
      <NextButton nextScreen={NEXT_SCREEN} />
      <BackButton />
    </PageLayout>
  );
};

export default EnterDeliveryTime;
