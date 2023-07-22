import { Form } from 'antd';
import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';

import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import ProgressBar from '../../Components/ProgressBar';
import { Tabs } from 'antd-mobile';
import SingleTripContent from '../../Components/PageComponents/SingleTripContent';
import RecurrentTripContent from '../../Components/PageComponents/RecurrentTripContent';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebaseConfig';
import { shallowEqual, useSelector } from 'react-redux';
import { IRouteInfo } from '../../type';

const PROGRESS = 33;
const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

const EnterDeliveryTime: React.FC = () => {
  const routeInfo = useSelector(
    (state: { route: IRouteInfo }) => state.route,
    shallowEqual
  );

  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [activeTab, setActiveTab] = useState(routeInfo.type);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <ProgressBar progress={PROGRESS} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <h2>{t('driveTime.title')}</h2>
          <Tabs
            onChange={handleTabChange}
            defaultActiveKey={
              routeInfo.type != '' ? routeInfo.type : t('driveTime.singleTrip')
            }
          >
            <Tabs.Tab
              title={t('driveTime.singleTrip')}
              key={t('driveTime.singleTrip')}
            >
              <SingleTripContent activeTab={activeTab} />
            </Tabs.Tab>
            <Tabs.Tab
              title={t('driveTime.recurringRide')}
              key={t('driveTime.recurringRide')}
            >
              <RecurrentTripContent activeTab={activeTab} />
            </Tabs.Tab>
          </Tabs>
        </Form>
        <div className="form-button-container mod-display-flex mod-flex-space-between">
          <BackButton
            onClick={() => {
              logEvent(analytics, 'drive_2_time_back_button_click');
            }}
          />
          <NextButton
            nextScreen={NEXT_SCREEN}
            onClick={() => {
              logEvent(analytics, 'drive_2_time_next_button_click');
            }}
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default EnterDeliveryTime;
