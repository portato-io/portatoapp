import React, { useContext } from 'react';
import { Badge, TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

function ProfileButton() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  function handleClickProfileButton() {
    navigate('/profile');
  }
  return (
    <div>
      <div style={{ position: 'absolute', right: '5vw', top: '3vw' }}>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          onClick={handleClickProfileButton}
        />
        {/* Render the slide-out menu */}
        <Menu
          right
          isOpen={isOpen}
          onStateChange={({ isOpen }) => setIsOpen(isOpen)}
        >
          <ProfileMenu isOpen={isOpen} onClose={closeMenu} />
        </Menu>
      </div>
    </div>
  );
}

export default ProfileButton;
