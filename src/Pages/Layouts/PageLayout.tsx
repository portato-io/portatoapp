import React, { ReactNode, useState } from 'react';
import AppHeader from '../../Components/HeaderBar';
import ButtomHeaderBar from '../../Components/ButtonHeaderBar';
import SideBarNav from '../../Components/SideBarNav';
import { Layout } from 'antd';
require('../../CSS/ProposedDeprecation.css');
const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Layout className="main-layout">
      <Header style={{ background: '#1875BC' }}>
        <span className="HeaderMenu">
          <AppHeader />
        </span>
        <span className="HeaderButton">
          <ButtomHeaderBar setOpenMenu={setOpenMenu} />
        </span>
      </Header>
      <SideBarNav openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Content style={{ maxHeight: 'calc(100vh - 60px)', overflow: 'auto' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
