import React, { ReactNode, useState } from 'react';
import AppHeader from '../../Components/HeaderBar';
import ButtomHeaderBar from '../../Components/ButtonHeaderBar';
import SideBarNav from '../../Components/SideBarNav';

import { Layout } from 'antd';
import BottomBar from '../../Components/BottomBar';
const { Header, Content, Footer } = Layout;

interface Props {
  children: ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Layout className="main-layout">
      <Content className="layout-children">{children}</Content>
      <BottomBar />
    </Layout>
  );
};

export default MainLayout;
