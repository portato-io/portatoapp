import React from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { AutoCenter, Tabs } from 'antd-mobile';
import RoutesContent from '../../Components/PageComponents/RoutesContent';
import DealsContent from '../../Components/PageComponents/DealsContents';

const Deliver: React.FC = () => {
  return (
    <PageLayout>
      <Tabs style={{}}>
        <Tabs.Tab title="Deals" key="deals">
          <AutoCenter className="contentContainer">
            <DealsContent />
          </AutoCenter>
        </Tabs.Tab>
        <Tabs.Tab title="Routes" key="routes">
          <AutoCenter className="contentContainer">
            <RoutesContent />
          </AutoCenter>
        </Tabs.Tab>
      </Tabs>
    </PageLayout>
  );
};

export default Deliver;
