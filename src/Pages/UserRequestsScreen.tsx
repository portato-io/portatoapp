import React, { useState, useEffect } from 'react';
import FetchRequests from '../Components/FetchRequests';
import { useAuth } from '../Components/AuthProvider';
import FirebaseAuth from '../Components/FirebaseAuth';
import { Modal } from 'antd';
import ProfilePageLayout from './Layouts/ProfilePagesLayout';

const UserRequestsScreen: React.FC = () => {
  const { uid } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!uid) {
      setIsModalVisible(true);
    }
  }, [uid]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ProfilePageLayout>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <FirebaseAuth />
        </div>
      </Modal>
      <div>
        <h1
          style={{
            marginTop: '5vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Your Current Requests
        </h1>
        <FetchRequests uid={uid} />
      </div>
    </ProfilePageLayout>
  );
};

export default UserRequestsScreen;
