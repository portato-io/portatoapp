import React, { useEffect, useState } from 'react';
import PageLayout from '../Pages/Layouts/PageLayoutTest';
import { List, Card, Button } from 'antd-mobile';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function RoutesContent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/enterObjInfo');
  };
  return (
    <div style={{ height: '100vh' }}>
      <Button
        size="large"
        //style={{ display:'flex', left: '30%', top: '20%' }}
        onClick={handleClick}
      >
        Create new Route
      </Button>
    </div>
  );
}
export default RoutesContent;
