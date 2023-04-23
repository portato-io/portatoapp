import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";

const FirebaseAuth = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize FirebaseUI
    const uiConfig = {
      signInSuccessUrl: "/enterObjInfo",
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          navigate(-1);
          return false;
        },
      },
    };

    // Initialize the FirebaseUI widget
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [navigate]);

  return <div id="firebaseui-auth-container" ref={uiRef}></div>;
};

export default FirebaseAuth;
