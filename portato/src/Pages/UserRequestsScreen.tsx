// UserRequestsScreen.tsx
import React from "react";
import UserRequests from "./userRequests"; // Import UserRequests from the correct path
import PageLayout from "./Layouts/PageLayoutTest";

const UserRequestsScreen: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h1>User Requests Screen</h1>
        <UserRequests />
      </div>
    </PageLayout>
  );
};

export default UserRequestsScreen;
