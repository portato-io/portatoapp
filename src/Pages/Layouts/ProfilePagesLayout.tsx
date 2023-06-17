import { ReactNode } from 'react';
import { Layout } from 'antd';
import BottomBar from '../../Components/BottomBar';
import BackArrow from '../../Components/Buttons/BackArrow';
const { Content } = Layout;

interface Props {
  children: ReactNode;
  display?: string;
}

const ProfilePageLayout = (props: Props) => {
  const { children, display = '' } = props;
  return (
    <Layout style={{ display: display }} className="main-layout">
      <BackArrow />
      <Content>{children}</Content>
      <BottomBar />
    </Layout>
  );
};

export default ProfilePageLayout;
