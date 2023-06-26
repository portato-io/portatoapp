import React, { useContext } from 'react';
import { Badge, TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppOutline,
  SendOutline,
  AppstoreOutline,
  TruckOutline,
} from 'antd-mobile-icons';
import { useTranslation } from 'react-i18next';

function BottomBar() {
  const { t } = useTranslation<string>(); // Setting the generic type to string

  const tabs = [
    {
      key: '/',
      title: t('navBar.home'),
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/createSendRequest',
      title: t('navBar.send'),
      icon: <SendOutline />,
      badge: '5',
    },
    {
      key: '/deliver',
      title: t('navBar.drive'),
      icon: <TruckOutline />,
    },
    {
      key: '/profile',
      title: t('navBar.profile'),
      icon: <AppstoreOutline />,
    },
  ];

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const firstSlashIndex: number = pathname.indexOf('/');
  const secondSlashIndex: number = pathname.indexOf('/', firstSlashIndex + 1);
  let initalRouteScreen = '';
  if (secondSlashIndex !== -1) {
    initalRouteScreen = pathname.slice(firstSlashIndex, secondSlashIndex);
  } else {
    initalRouteScreen = pathname;
  }
  return (
    <div className="main-navigation-bar-container">
      <TabBar
        activeKey={initalRouteScreen}
        onChange={(value) => setRouteActive(value)}
        className="main-navigation-bar"
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            // badge={item.badge}
            className="main-navigation-bar-element"
          />
        ))}
      </TabBar>
    </div>
  );
}

export default BottomBar;
