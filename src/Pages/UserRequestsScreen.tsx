import React from 'react';
import FetchRequests from '../Components/FetchRequests'; // Import UserRequests from the correct path
import PageLayout from './Layouts/PageLayoutTest';
import { getAuth } from 'firebase/auth';
import ProfilePageLayout from './Layouts/ProfilePagesLayout';

const UserRequestsScreen: React.FC = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  let uid = 'undefined';
  if (currentUser) {
    uid = currentUser.uid;
  }

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
        <FetchRequests uid={uid} heightPortion={0.7} />
      </div>
    </ProfilePageLayout>
  );
};

export default UserRequestsScreen;
