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
import styled from 'styled-components';

const StyledTabs = styled.div`
  /* Deleting the horizontal line */
  .adm-tabs-header {
    border: none;
  }

  /* Deleting the indicator line */
  .adm-tabs-tab-line {
    display: none;
  }

  /* Flexbox layout*/
  .adm-tabs-tab-wrapper {
    display: flex;
  }

  /* Common styles for both active and inactive tabs */
  .adm-tabs-tab {
    flex: 1; /* This ensures both tabs take up equal width */
    padding: 10px; /* Adjust padding as needed */
    text-align: center; /* Centers the text horizontally */
    display: flex; /* To use flexbox properties for vertical centering */
    justify-content: center;
    border-radius: 4px;
    background-color: #f1f1f1;
    color: #666;
  }

  .adm-tabs-tab.adm-tabs-tab-active {
    background-color: #60a353; /* Active tab background color */
    color: white; /* Active tab text color */
  }
`;

const PROGRESS = 33;
const NEXT_SCREEN = '/deliver/enterDeliveryCapacity';

const EnterDeliveryTime: React.FC = () => {
  const routeInfo = useSelector(
    (state: { route: IRouteInfo }) => state.route,
    shallowEqual
  );

  const { t } = useTranslation<string>(); // Setting the generic type to string
  const [activeTab, setActiveTab] = useState(routeInfo.type || 'single');

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
          <StyledTabs>
            <Tabs
              onChange={handleTabChange}
              defaultActiveKey={
                routeInfo.type != ''
                  ? routeInfo.type
                  : t('driveTime.singleTrip')
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
          </StyledTabs>
        </Form>
        {/* <div className="form-button-container mod-display-flex mod-flex-space-between">
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
        </div> */}
      </section>
    </PageLayout>
  );
};

export default EnterDeliveryTime;
