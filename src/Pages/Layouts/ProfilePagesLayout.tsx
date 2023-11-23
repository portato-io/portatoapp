import { ReactNode } from 'react';
import { Layout } from 'antd';
import BottomBar from '../../Components/BottomBar';
import HeaderBar from '../../Components/HeaderBar';
import BackArrow from '../../Components/Buttons/BackArrow';
import { Header } from 'antd/es/layout/layout';
const { Content } = Layout;

require('../../CSS/Profile.css');

interface Props {
  children: ReactNode;
  display?: string;
}

const ProfilePageLayout = (props: Props) => {
  const { children, display = '' } = props;
  return (
    <Layout style={{ display: display }} className="main-layout">
      <HeaderBar />
      <div className="layout-wrapper">
        <main className="main-container-split">
          <Content>{children}</Content>
        </main>
      </div>
      <BottomBar />
    </Layout>
  );
};

export default ProfilePageLayout;
