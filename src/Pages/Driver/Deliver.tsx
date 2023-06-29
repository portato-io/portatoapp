import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { AutoCenter, Tabs } from 'antd-mobile';
import RoutesContent from '../../Components/PageComponents/RoutesContent';
import DealsContent from '../../Components/PageComponents/DealsContents';
import { useTranslation } from 'react-i18next';
//import DealsContent from '../../Components/PageComponents/DealsContents';

// TODO Mischa: Determine whether user has a route or not. If not; show routes page!
//const HAS_ROUTES = false;

const Deliver: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <PageLayout>
      {/* 
      TODO: Move the tabs to the bottom of the screen - at least on mobile!
      TODO: Re-enable the deals tab when it's implemented.
      <Tabs defaultActiveKey={HAS_ROUTES ? 'deals' : 'routes'}>
        <Tabs.Tab title="Deals" key="deals">
          <AutoCenter className="deliver-overview-content-container">
            <DealsContent />
          </AutoCenter>
        </Tabs.Tab>
        <Tabs.Tab title="Routes" key="routes">
          <AutoCenter className="deliver-overview-content-container">
            <RoutesContent />
          </AutoCenter>
        </Tabs.Tab>
      </Tabs> */}
      <section className="section ">
        <h2>{t('driveOverview.newTitle')}</h2>
        <RoutesContent />
      </section>
    </PageLayout>
  );
};

export default Deliver;
