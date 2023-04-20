import React, { useEffect, useState } from "react";
import PageLayout from './Layouts/PageLayoutTest'
import "firebaseui/dist/firebaseui.css";
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { onAuthStateChanged, User } from "firebase/auth";
import FirebaseAuth from '../Components/FirebaseAuth';


import { Typography } from 'antd';

const { Title } = Typography;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User signed in:", currentUser); // Added console log
        setUser(currentUser);
      } else {
        console.log("User signed out"); // Added console log
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <FirebaseAuth />
      {user ? (
        <>
          <h1>Welcome, {user.displayName || user.email}!</h1>
          <button onClick={() => signOut(auth)}>Sign out</button>
        </>
      ) : (
        <FirebaseAuth />
      )}
    </div>
  );
};

export default Profile;
