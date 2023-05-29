import React from 'react';
import FetchRequests from '../Components/FetchRequests'; // Import UserRequests from the correct path
import { useAuth } from '../Components/AuthProvider';
import ProfilePageLayout from './Layouts/ProfilePagesLayout';

const UserRequestsScreen: React.FC = () => {
  const { uid } = useAuth();

  return (
    <ProfilePageLayout>
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
        <FetchRequests uid={uid} heightPortion={0.9} />
      </div>
    </ProfilePageLayout>
  );
};

export default UserRequestsScreen;
