import { ReactNode, useState, useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import HeaderBar from '../../Components/HeaderBar';
import BottomBar from '../../Components/BottomBar';
import { useTranslation } from 'react-i18next';

import en_US from 'antd/lib/locale/en_US';
import fr_FR from 'antd/lib/locale/fr_FR';
import de_DE from 'antd/lib/locale/de_DE';

require('../../CSS/FillOutForms.css');

const { Content } = Layout;

interface Props {
  children: ReactNode;
  display?: string;
}

const MainLayout = (props: Props) => {
  const [locale, setLocale] = useState(en_US);

  const { i18n } = useTranslation();
  // Update the antd locale when i18n language changes
  useEffect(() => {
    switch (i18n.language) {
      case 'fr_FR':
        setLocale(fr_FR);
        break;
      case 'de_DE':
        setLocale(de_DE);
        break;
      default:
        setLocale(en_US);
    }
  }, [i18n.language]);

  const { children, display = '' } = props;
  return (
    <ConfigProvider locale={locale}>
      <Layout style={{ display: display }}>
        <HeaderBar />
        <div className="layout-wrapper">
          <main className="main-container-split">
            <Content>{children}</Content>
          </main>

          <BottomBar />
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
