import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { uiInstance, uiConfig } from "./firebaseUIInstance";

const FirebaseAuth: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the signInSuccessUrl and callbacks in uiConfig
    uiConfig.signInOptions = [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ];
    uiConfig.callbacks = {
      signInSuccessWithAuthResult: () => {
        navigate(-1);
        return false;
      },
    };

    // Start the FirebaseUI widget
    uiInstance.start("#firebaseui-auth-container", uiConfig);

    // Cleanup on unmount
    return () => {
      uiInstance.reset();
    };
  }, [navigate]);

  return <div id="firebaseui-auth-container" ref={uiRef}></div>;
};

export default FirebaseAuth;
