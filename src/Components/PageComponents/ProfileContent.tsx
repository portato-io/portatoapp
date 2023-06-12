import React from 'react';
import PageLayout from '../../Pages/Layouts/PageLayoutTest';
import { List, Card } from 'antd-mobile';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../AuthProvider';

function ProfileContent() {
  const navigate = useNavigate();
  const isAdmin = checkAdmin();

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
              <UserOutlined style={{ fontSize: '48px' }} />
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
                <List.Item arrow={true} onClick={handleMyAccountClick}>
                  My Account
                </List.Item>
                <List.Item arrow={true} onClick={handleMySendRequestsClick}>
                  My Send Requests
                </List.Item>
                <List.Item arrow={true} onClick={handleMyBlogClick}>
                  Blog
                </List.Item>
                <List.Item arrow={true} onClick={handleSupportClick}>
                  Support
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
        </div>
      </div>
    </PageLayout>
  );
}

export default ProfileContent;
