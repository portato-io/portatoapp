import React, { useState, useEffect } from 'react';
import PageLayout from '../Pages/Layouts/PageLayoutTest';
import { List, Card } from 'antd-mobile';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../firebaseConfig';
import FirebaseAuth from '../Components/FirebaseAuth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Components/AuthProvider';

require('../CSS/Profile.css');

const Menu: React.FC = () => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setImageUrl(user.photoURL);
    } else {
      console.log('user not fully signed in');
    }
  }, [user]); // Make sure to include 'user' in your dependency array, so useEffect re-runs when 'user' changes.

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0); // State to hold the key for FirebaseAuth
  const showModal = () => {
    setIsModalVisible(true);
    setModalKey((prevKey) => prevKey + 1); // Update key each time the modal is opened
  };

  const handleAuthSuccess = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMyAccountClick = () => {
    navigate('/profile/my-account');
  };

  const handleMyBlogClick = () => {
    // navigate to My Payment Methods screen
  };

  const handleMySendRequestsClick = () => {
    navigate('/profile/user_requests');
  };

  const handleAdminClick = () => {
    navigate('/admin/admin_dashboard');
  };
  // display prop should be managed appropriately
  const display = 'block';

  const handleSupportClick = () => {
    navigate('/contact_support');
  };

  const handleSettingsClick = () => {
    navigate('/profile/settings');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout display={display}>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <FirebaseAuth key={modalKey} onAuthSuccess={handleAuthSuccess} />
        </div>
      </Modal>
      <div className="profile-screen-background">
        <div className="profile-image-container">
          <div className="profile-image-bubble">
            {user && imageUrl ? (
              <img
                src={new URL(imageUrl).href}
                alt="avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            ) : (
              <UserOutlined style={{ fontSize: '48px' }} />
            )}
          </div>
        </div>

        <Card className="settings-card">
          <List mode="card" style={{ marginTop: '1vh' }}>
            {user ? (
              <>
                <List.Item
                  arrow={true}
                  onClick={handleMyAccountClick}
                  className="settings-list-item"
                >
                  {t('navigationMenu.myAccount')}
                </List.Item>
                {/* <List.Item arrow={true} onClick={handleMySendRequestsClick}>
                  {t('navigationMenu.mySendRequests')}
                </List.Item> */}
              </>
            ) : (
              <List.Item
                arrow={true}
                onClick={showModal}
                className="settings-list-item"
              >
                {t('navigationMenu.signIn')}
              </List.Item>
            )}

            {/* <List.Item arrow={true} onClick={handleMyBlogClick}>
              {t('navigationMenu.blog')}
            </List.Item> */}
            <List.Item
              arrow={true}
              onClick={handleSupportClick}
              className="settings-list-item"
            >
              {t('navigationMenu.support')}
            </List.Item>
            <List.Item
              arrow={true}
              onClick={handleSettingsClick}
              className="settings-list-item"
            >
              {t('navigationMenu.settings')}
            </List.Item>
            {isAdmin && (
              <List.Item
                arrow={true}
                onClick={handleAdminClick}
                className="settings-list-item"
              >
                {t('navigationMenu.adminWindow')}
              </List.Item>
            )}
            {user ? (
              <List.Item
                arrow={true}
                onClick={() => signOut(auth)}
                style={{ color: 'red' }}
                className="settings-list-item"
              >
                {t('navigationMenu.signOut')}
              </List.Item>
            ) : null}
          </List>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Menu;
