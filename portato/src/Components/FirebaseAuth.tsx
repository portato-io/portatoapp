import React, { useEffect, useRef } from "react";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { uiInstance, uiConfig } from "./firebaseUIInstance";

const FirebaseAuth: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Update the signInSuccessUrl and callbacks in uiConfig
    uiConfig.signInOptions = [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ];
    uiConfig.callbacks = {
      signInSuccessWithAuthResult: () => {
        window.location.replace(window.location.pathname);
        return false;
      },
    };

    // Start the FirebaseUI widget
    uiInstance.start("#firebaseui-auth-container", uiConfig);

    // Cleanup on unmount
    return () => {
      uiInstance.reset();
    };
  }, []);

  return <div id="firebaseui-auth-container" ref={uiRef}></div>;
};

export default FirebaseAuth;
