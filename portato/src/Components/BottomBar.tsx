import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ProfileOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;

const BottomBar: React.FC = () => {
  const [current, setCurrent] = useState<string>('home');

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <Footer>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="profile" icon={<ProfileOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Mail
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Footer>
  );
};

export default BottomBar;