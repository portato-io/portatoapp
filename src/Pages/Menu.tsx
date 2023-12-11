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
      <div className="section">
        <div className="profile-screen-background">
          <div className="profile-image-container">
            <div className="profile-image-bubble">
              {user && imageUrl ? (
                <>
                  <div className="spacer-small"></div>
                  <img
                    src={new URL(imageUrl).href}
                    alt="avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                </>
              ) : (
                <UserOutlined style={{ fontSize: '48px' }} />
              )}
            </div>
          </div>
        </div>

        <div className="section">
          <nav className="profile-navigation text-align-center">
            {user ? (
              <>
                <div className="spacer-small"></div>
                <a
                  className="text-link icon-link"
                  onClick={handleMyAccountClick}
                >
                  <i className="icon icon-profile"></i>
                  {t('navigationMenu.myAccount')}
                </a>
              </>
            ) : (
              <a className="text-link icon-link" onClick={showModal}>
                <i className="icon icon-lock-open"></i>
                {t('navigationMenu.signIn')}
              </a>
            )}
            <a className="text-link icon-link" onClick={handleSupportClick}>
              <i className="icon icon-help"></i>
              {t('navigationMenu.support')}
            </a>
            <a className="text-link icon-link" onClick={handleSettingsClick}>
              <i className="icon icon-pen"></i>
              {t('navigationMenu.settings')}
            </a>

            {user ? (
              <a
                className="text-link icon-link text-link-warning"
                onClick={() => signOut(auth)}
              >
                <i className="icon icon-lock-close"></i>
                {t('navigationMenu.signOut')}
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </PageLayout>
  );
};

export default Menu;
