import { ReactNode } from 'react';
import { Layout } from 'antd';
import BottomBar from '../../Components/BottomBar';
require('../../CSS/FillOutForms.css');

const { Content } = Layout;

interface Props {
  children: ReactNode;
  display?: string;
}

const MainLayout = (props: Props) => {
  const { children, display = '' } = props;
  return (
    <Layout style={{ display: display }}>
      <div className="main-page-split">
        <main className="main-container-split">
          <Content>{children}</Content>
        </main>

        <BottomBar />
      </div>
    </Layout>
  );
};

export default MainLayout;
