import React, { useState, useEffect, useContext } from 'react';
import PageLayout from '../Pages/Layouts/PageLayoutTest';
import { List, Card } from 'antd-mobile';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../firebaseConfig';
import FirebaseAuth from '../Components/FirebaseAuth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { TranslationContext } from '../Contexts/TranslationContext';
import { useAuth, checkAdmin } from '../Components/AuthProvider';

const Menu: React.FC = () => {
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();
  const isAdmin = checkAdmin();
  const user = auth.currentUser;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setImageUrl(user.photoURL);
    }
  }, []);
  const { uid } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
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

  const handleMyDeliveriesClick = () => {
    // navigate to My Deliveries screen
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

  return (
    <PageLayout display={display}>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <FirebaseAuth />
        </div>
      </Modal>
      <div style={{ display: display }} className="profile_content">
        {/* Rest of your code... */}
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#2897FF',
          }}
        >
          <div
            style={{
              backgroundColor: '#2897FF',
              flex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 'min(min(50vw,50vh),250px)',
                height: 'min(min(50vw,50vh),250px)',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {imageUrl ? (
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
          <div
            style={{
              backgroundColor: '#2897FF',
              flex: 6,
              height: '80vh',
              overflowY: 'auto',
            }}
          >
            <Card style={{ borderRadius: '5%', height: '100%' }}>
              <List mode="card" style={{ marginTop: '1vh' }}>
                {uid ? (
                  <>
                    <List.Item arrow={true} onClick={handleMyAccountClick}>
                      {t('navigationMenu.myAccount')}
                    </List.Item>
                    <List.Item arrow={true} onClick={handleMySendRequestsClick}>
                      {t('navigationMenu.mySendRequests')}
                    </List.Item>
                  </>
                ) : (
                  <List.Item arrow={true} onClick={showModal}>
                    {t('navigationMenu.signIn')}
                  </List.Item>
                )}

                <List.Item arrow={true} onClick={handleMyBlogClick}>
                  {t('navigationMenu.blog')}
                </List.Item>
                <List.Item arrow={true} onClick={handleSupportClick}>
                  {t('navigationMenu.support')}
                </List.Item>
                {isAdmin && (
                  <List.Item arrow={true} onClick={handleAdminClick}>
                    {t('navigationMenu.adminWindow')}
                  </List.Item>
                )}
                {uid ? (
                  <List.Item
                    arrow={true}
                    onClick={() => signOut(auth)}
                    style={{ color: 'red' }}
                  >
                    {t('navigationMenu.signOut')}
                  </List.Item>
                ) : null}
              </List>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Menu;
