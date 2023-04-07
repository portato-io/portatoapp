import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
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
    key: 'home',
    title: 'home',
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: 'todo',
    title: 'send',
    icon: <UnorderedListOutline />,
    badge: '5',
  },
  {
    key: 'message',
    title: 'deliver',
    icon: (active: boolean) =>
      active ? <MessageFill /> : <MessageOutline />,
    badge: '99+',
  },
  {
    key: 'personalCenter',
    title: 'profile',
    icon: <UserOutline />,
  },
]

function BottomBar(){
  return (
    //<Footer style={{background:'white',width:'100vh'}}>
      <TabBar style={{position:'absolute',bottom:'0%',background:'#2897FF', width:'100%'}}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
    //</Footer>
  );
  };

export default BottomBar;
