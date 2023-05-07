import React from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { AutoCenter, Tabs } from 'antd-mobile';
import RoutesContent from '../Components/RoutesContent';
import DealsContent from '../Components/DealsContents';

const Deliver: React.FC = () => {
  return (
    <PageLayout>
      <Tabs style={{}}>
        <Tabs.Tab title="Deals" key="deaks">
          <AutoCenter>
            <DealsContent />
          </AutoCenter>
        </Tabs.Tab>
        <Tabs.Tab title="Routes" key="routes">
          <AutoCenter>
            <RoutesContent />
          </AutoCenter>
        </Tabs.Tab>
      </Tabs>
      {/* <Switch
        onChange={toggleSwitch}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
         {isEnabled ? <Title>Deals</Title> : <Title>Routes</Title>}

      </div> */}
    </PageLayout>
  );
};

export default Deliver;
