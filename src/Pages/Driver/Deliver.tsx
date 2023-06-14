import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { AutoCenter, Tabs } from 'antd-mobile';
import RoutesContent from '../../Components/PageComponents/RoutesContent';
import DealsContent from '../../Components/PageComponents/DealsContents';

// TODO Mischa: Determine whether user has a route or not. If not; show routes page!
const HAS_ROUTES = false;

const Deliver: React.FC = () => {
  return (
    <PageLayout>
      {/* TODO Mischa: Move the tabs to the bottom of the screen - at least on mobile! */}
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
      </Tabs>
    </PageLayout>
  );
};

export default Deliver;
