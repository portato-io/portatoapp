import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function ButtomHeaderBar({ setOpenMenu }: any) {
  return (
    <div className="MenuButton" style={{ height: '100vh' }}>
      <div
        style={{
          textAlign: 'right',
          backgroundColor: '#60a353',
          height: 50,
          fontSize: 20,
        }}
      >
        <MenuOutlined onClick={() => setOpenMenu(true)} />
      </div>
    </div>
  );
}

export default ButtomHeaderBar;
