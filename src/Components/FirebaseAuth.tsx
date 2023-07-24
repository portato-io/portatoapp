import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  UserCredential,
  sendEmailVerification,
  EmailAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { notification } from 'antd';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(getAuth());

interface FirebaseUIAuthCallbacks {
  signInSuccessWithAuthResult?: (
    authResult: UserCredential,
    redirectUrl: string
  ) => boolean;
}

interface FirebaseUIAuthConfig {
  callbacks?: FirebaseUIAuthCallbacks;
  signInOptions?: Array<any>;
}

const FirebaseAuth: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const uiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          sendEmailVerification(user).then(() => {
            notification.success({
              message: 'Verification Email Sent',
              description:
                'Please check your inbox for the verification email.',
            });
            signOut(auth); // Sign out the user after sending the verification email
            navigate('/verify-email');
          });
        }
      }
    });

    // Configure FirebaseUI.
    const uiConfig: FirebaseUIAuthConfig = {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      ui.reset();
    };
  }, [navigate]);

  return (
    <div>
      <div id="firebaseui-auth-container" ref={uiRef}></div>
    </div>
  );
};

export default FirebaseAuth;
