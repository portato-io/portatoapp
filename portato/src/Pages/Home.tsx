import React from 'react';
import { Typography} from 'antd';
import PageLayout from "./Layouts/PageLayoutTest";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const Home: React.FC = () => {

  const { t, i18n } = useTranslation(['home']);


  return (

    <PageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Title level={2} style={{ textAlign: 'center'}}>{t("line1")}</Title>
      </div>
    </PageLayout>
  );
};

export default Home;
