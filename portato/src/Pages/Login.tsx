// FirebaseAuth.js
import React, { useEffect, useRef } from 'react';
import "firebaseui/dist/firebaseui.css";
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";

const FirebaseAuth = () => {
    const uiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the FirebaseUI widget is already rendered
    if (uiRef.current) {
      return;
    }

    // Initialize FirebaseUI
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
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return <div id="firebaseui-auth-container" ref={uiRef}></div>;
};

export default FirebaseAuth;
