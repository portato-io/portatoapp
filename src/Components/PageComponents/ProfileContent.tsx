import React from 'react';
import PageLayout from '../../Pages/Layouts/PageLayoutTest';
import { List, Card } from 'antd-mobile';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../AuthProvider';

require('../../CSS/Profile.css');

function ProfileContent() {
  const navigate = useNavigate();
  const isAdmin = checkAdmin();

  const handleMyAccountClick = () => {
    // navigate to My Account screen
  };

  const handleMyPaymentMethodsClick = () => {
    // navigate to My Payment Methods screen
  };

  const handleMyDeliveriesClick = () => {
    // navigate to My Deliveries screen
  };

  const handleMySendRequestsClick = () => {
    navigate('/profile/user_requests');
  };

  const handleAdminClick = () => {
    navigate('/admin/admin_dashboard');
  };

  const handleSupportClick = () => {
    navigate('/contact_support');
  };

  const handleSettingsClick = () => {
    navigate('/profile/settings');
  };

  return (
    <PageLayout>
      <div className="profile-screen-background">
        <div className="profile-image-container">
          <div className="profile-image-bubble">
            <UserOutlined style={{ fontSize: '48px' }} />
          </div>
        </div>

        <Card className="settings-card">
          <List mode="card" style={{ marginTop: '1vh' }}>
            <List.Item arrow={true} onClick={handleMyAccountClick}>
              My Account
            </List.Item>
            <List.Item arrow={true} onClick={handleMyPaymentMethodsClick}>
              My Payment Methods
            </List.Item>
            <List.Item arrow={true} onClick={handleMyDeliveriesClick}>
              My Deliveries
            </List.Item>
            <List.Item arrow={true} onClick={handleMySendRequestsClick}>
              My Send Requests
            </List.Item>
            <List.Item arrow={true} onClick={handleSupportClick}>
              Support
            </List.Item>
            <List.Item arrow={true} onClick={handleSettingsClick}>
              Settings
            </List.Item>
            {isAdmin && (
              <List.Item arrow={true} onClick={handleAdminClick}>
                Admin window
              </List.Item>
            )}
            <List.Item
              arrow={true}
              onClick={() => signOut(auth)}
              style={{ color: 'red' }}
            >
              Sign out
            </List.Item>
          </List>
        </Card>
      </div>
    </PageLayout>
  );
}

export default ProfileContent;
