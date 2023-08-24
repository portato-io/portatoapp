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
      icon: <i className="icon icon-big icon-home" />,
      badge: Badge.dot,
    },
    {
      key: '/createSendRequest',
      title: t('navBar.send'),
      icon: <i className="icon icon-big icon-send" />,
      badge: '5',
    },
    {
      key: '/deliver',
      title: t('navBar.drive'),
      icon: <i className="icon icon-big icon-drive" />,
    },
    {
      key: '/profile',
      title: t('navBar.profile'),
      icon: <i className="icon icon-big icon-profile" />,
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

        {/* Add another tab bar item, for when the screen is narrow (otherwise)
        the crips bubble sits on top of the last icon! */}
        <TabBar.Item
          key=""
          icon=""
          title=""
          className="main-navigation-bar-element crisp-bubble-placeholder"
        />
      </TabBar>
    </div>
  );
}

export default BottomBar;
