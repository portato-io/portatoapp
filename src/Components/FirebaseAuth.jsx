import Userfront, { SignupForm } from '@userfront/toolkit/react';

const FirebaseAuth = () => {
  // Initialize Userfront
  Userfront.init('5nxmm7rb');
  return <SignupForm />;
};

export default FirebaseAuth;
