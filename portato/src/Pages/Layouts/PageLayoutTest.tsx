import React, { ReactNode, useState } from "react";

import { Layout } from "antd";
import BottomBar from "../../Components/BottomBar";
const { Content } = Layout;

interface Props {
  children: ReactNode;
  display?: string;
}

const MainLayout = (props: Props) => {
  const { children, display = "" } = props;
  return (
    <Layout style={{ display: display }} className="main-layout">
      <Content className="layout-children">{children}</Content>
      <BottomBar />
    </Layout>
  );
};

export default MainLayout;
