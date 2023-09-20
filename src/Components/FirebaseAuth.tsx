import React from 'react';
import Userfront, { SignupForm } from '@userfront/react';

const FirebaseAuth: React.FC = () => {
  // Initialize Userfront
  Userfront.init('yourUserfrontTenantId'); // Replace with your actual Userfront tenant ID

  return <Userfront.Login toolId="yourLoginToolId" />; // Replace with your actual Userfront login tool ID
};

export default FirebaseAuth;
