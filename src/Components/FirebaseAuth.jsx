import React, { useEffect } from 'react';
import Userfront, { SignupForm } from '@userfront/toolkit/react';

Userfront.init('5nxmm7rb'); // Initialize Userfront with your account ID

const FirebaseAuth = () => {
  useEffect(() => {
    // If you still need FirebaseUI operations, they can stay here.
    // For this example, I'll assume you're replacing FirebaseUI with Userfront.

    // The Userfront toolkit will handle the redirection and callbacks
    // once the SignupForm is rendered and the user interacts with it.

    // Cleanup on unmount (if you have any cleanup tasks related to Userfront)
    return () => {
      // Add your cleanup logic here (if any).
    };
  }, []);

  return (
    <div>
      {/* Render the Userfront SignupForm */}
      <SignupForm />
    </div>
  );
};

export default FirebaseAuth;
