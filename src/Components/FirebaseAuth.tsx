import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  UserCredential,
  sendEmailVerification,
  onAuthStateChanged,
  EmailAuthProvider,
} from 'firebase/auth';
import { notification } from 'antd';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const ui = new firebaseui.auth.AuthUI(getAuth());

interface FirebaseAuthProps {
  onAuthSuccess?: () => void;
}

const FirebaseAuth: React.FC<FirebaseAuthProps> = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize auth appropriately

  useEffect(() => {
    const uiConfig = {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          onAuthSuccess?.(); // Invoke the onAuthSuccess callback if provided
          return false; // Handle the post-sign-in tasks manually
        },
      },
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          if (!user.emailVerified) {
            sendEmailVerification(user)
              .then(() => {
                notification.success({
                  message: 'Verification Email Sent',
                  description:
                    'Please check your inbox for the verification email.',
                });
                navigate('/verify-email');
              })
              .catch((error) => {
                notification.error({
                  message: 'Error',
                  description: error.message,
                });
              });
          }
        });
      }
    });

    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      unsubscribe();
      ui.reset();
    };
  }, [navigate, auth, onAuthSuccess]);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuth;
