import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  return (
    <Header>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src="logo.png" alt="Logo" style={{ height: '50px' }} />
      </div>
    </Header>
  );
};

export default HeaderBar;