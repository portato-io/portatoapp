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
import '../CSS/Profile.css';

const Menu: React.FC = () => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();
  const { user, isAdmin, loading, emailVerified } = useAuth();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setImageUrl(user.photoURL);
    } else {
      console.log('user not fully signed in');
    }
  }, [user]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const handleAuthSuccess = () => setIsModalVisible(false); // Close the popup when authentication is successful

  const handleNavigation = (path: string) => navigate(path);

  if (loading) return <div>Loading...</div>;

  return (
    <PageLayout display="block">
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <FirebaseAuth onAuthSuccess={handleAuthSuccess} />
      </Modal>
      <div className="profile-screen-background">
        <div className="profile-image-container">
          <div className="profile-image-bubble">
            {user && imageUrl ? (
              <img
                src={imageUrl}
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
                {user.emailVerified && (
                  <List.Item
                    arrow={true}
                    onClick={() => handleNavigation('/profile/my-account')}
                    className="settings-list-item"
                  >
                    {t('navigationMenu.myAccount')}
                  </List.Item>
                )}
                {!user.emailVerified && (
                  <List.Item
                    arrow={true}
                    onClick={showModal}
                    className="settings-list-item"
                  >
                    {t('navigationMenu.signIn')}
                  </List.Item>
                )}
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
            <List.Item
              arrow={true}
              onClick={() => handleNavigation('/contact_support')}
              className="settings-list-item"
            >
              {t('navigationMenu.support')}
            </List.Item>
            <List.Item
              arrow={true}
              onClick={() => handleNavigation('/profile/settings')}
              className="settings-list-item"
            >
              {t('navigationMenu.settings')}
            </List.Item>
            {isAdmin && (
              <List.Item
                arrow={true}
                onClick={() => handleNavigation('/admin/admin_dashboard')}
                className="settings-list-item"
              >
                {t('navigationMenu.adminWindow')}
              </List.Item>
            )}
            {emailVerified && (
              <List.Item
                arrow={true}
                onClick={() => signOut(auth)}
                style={{ color: 'red' }}
                className="settings-list-item"
              >
                {t('navigationMenu.signOut')}
              </List.Item>
            )}
          </List>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Menu;
