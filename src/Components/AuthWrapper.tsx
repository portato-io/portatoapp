import React from 'react';
import { Button, Spin } from 'antd';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import FirebaseAuth from '../Components/FirebaseAuth';
import BackButton from './Buttons/BackButton';
import PageLayout from '../Pages/Layouts/PageLayoutTest';
import './PortatoStyleSheet.css';

interface AuthWrapperProps {
  Component: React.FC;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ Component }) => {
  const [user, setUser] = React.useState<User | null | 'loading'>('loading');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('onAuthStateChanged:', currentUser); // Added console log
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (user === 'loading') {
    console.log('Rendering loading spinner'); // Added console log
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#2897FF',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  console.log('Rendering user:', user); // Added console log
  return user ? (
    <Component />
  ) : (
    <PageLayout>
      <div className="centered-container">
        <FirebaseAuth />
      </div>
    </PageLayout>
  );
};

export default AuthWrapper;