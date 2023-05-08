import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Badge, TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppOutline,
  SendOutline,
  UserOutline,
  TruckOutline,
} from 'antd-mobile-icons';

const tabs = [
  {
    key: '/',
    title: 'home',
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: '/createSendRequest',
    title: 'send',
    icon: <SendOutline />,
    badge: '5',
  },
  {
    key: '/deliver',
    title: 'deliver',
    icon: <TruckOutline />,
  },
  {
    key: '/profile',
    title: 'profile',
    icon: <UserOutline />,
  },
];

function BottomBar() {
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
    <TabBar
      activeKey={initalRouteScreen}
      onChange={(value) => setRouteActive(value)}
      style={{
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        borderTop: 'solid',
        borderTopColor: '#E8E9F1',
      }}
    >
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
          style={{ backgroundColor: 'white' }}
        />
      ))}
    </TabBar>
  );
}

export default BottomBar;
