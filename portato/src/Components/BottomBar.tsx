import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Badge, TabBar } from 'antd-mobile'
import { useNavigate,useLocation } from 'react-router-dom';
import {
  AppOutline,
  SendOutline,
  UnorderedListOutline,
  UserOutline,
  TruckOutline
} from 'antd-mobile-icons'
import {
  HomeOutlined,
  ProfileOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const tabs = [
  {
    key: '/home',
    title: 'home',
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: '/enterObjInfo',
    title: 'send',
    icon: <SendOutline />,
    badge: '5',
  },
  {
    key: '/deliver',
    title: 'deliver',
    icon: <TruckOutline/>,
  },
  {
    key: '/profile',
    title: 'profile',
    icon: <UserOutline />,
  },
]


function BottomBar(){
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {

    navigate(value)
  }
  return (
    //<Footer style={{background:'white',width:'100vh'}}>
      <TabBar activeKey={pathname}
       onChange={value => setRouteActive(value)}
       style={{position:'absolute',bottom:'0%',background:'#2897FF', width:'100%'}}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} style={{color:'white'}}/>
          ))}
        </TabBar>
    //</Footer>
  );
  };

export default BottomBar;
