import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCredential,
  sendEmailVerification,
  EmailAuthProvider,
  AdditionalUserInfo,
} from 'firebase/auth';
import { uiInstance } from './firebaseUIInstance';

interface FirebaseUIAuthConfig {
  callbacks?: {
    signInSuccessWithAuthResult?: (
      authResult: UserCredential & {
        additionalUserInfo?: AdditionalUserInfo | null;
      },
      redirectUrl: string
    ) => boolean;
  };
  signInOptions?: Array<any>;
}

const FirebaseAuth: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const uiConfig: FirebaseUIAuthConfig = {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          const user = authResult.user;
          if (!user.emailVerified) {
            setErrorMessage('Email not verified');
            return false;
          }
          return true;
        },
      },
    };

    // On user sign up, send verification email
    uiConfig.callbacks!.signInSuccessWithAuthResult = (authResult) => {
      const user = authResult.user;
      if (authResult.additionalUserInfo?.isNewUser) {
        sendEmailVerification(user); // Here
        navigate('/verify-email'); // navigate to verify email page
        return false; // stop sign-in process to allow email verification
      }
      return true; // continue sign-in process
    };

    uiInstance.start('#firebaseui-auth-container', uiConfig);

    return () => {
      uiInstance.reset();
    };
  }, [navigate]);

  return (
    <div>
      <div id="firebaseui-auth-container" ref={uiRef}></div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default FirebaseAuth;
