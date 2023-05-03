// UserRequestsScreen.tsx
import React from 'react';
import UserRequests from './userRequests'; // Import UserRequests from the correct path
import PageLayout from './Layouts/PageLayoutTest';

const UserRequestsScreen: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <UserRequests />
      </div>
    </PageLayout>
  );
};

export default UserRequestsScreen;
