import React, { useEffect } from "react";
import PageLayout from './Layouts/PageLayoutTest'
import "firebaseui/dist/firebaseui.css";
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";



import { Typography } from 'antd';

const { Title } = Typography;

const uiConfig = {
  signInSuccessUrl: "/enterObjInfo", // e.g., "index.html"
  signInOptions: [
    // List the authentication providers you want to support
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
};

// Initialize the FirebaseUI widget
const ui = new firebaseui.auth.AuthUI(auth);

const Profile: React.FC = () => {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", uiConfig);

    // Clean up the UI widget when the component is unmounted
    return () => {
      ui.reset();
    };
  }, []);

  return (
    <PageLayout>
      <div id="firebaseui-auth-container"></div>
    </PageLayout>
  );
};

export default Profile;
