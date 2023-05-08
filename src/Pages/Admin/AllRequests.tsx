// UserRequestsScreen.tsx
import React from 'react';
import UserRequests from '../userRequests'; // Import UserRequests from the correct path
import PageLayout from '../Layouts/PageLayoutTest';

const AllRequests: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <UserRequests />
      </div>
    </PageLayout>
  );
};

export default AllRequests;
