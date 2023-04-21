import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";

const FirebaseAuth = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate(); // Get the useNavigate instance

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
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // Redirect the user to the previous page after successful sign-in
          navigate(-1); // Navigate back to the previous page
          return false; // Prevent default redirection by FirebaseUI
        },
      },
    };

    // Initialize the FirebaseUI widget
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [navigate]); // Add navigate as a dependency

  console.log(uiRef)

  return <div id="firebaseui-auth-container" ref={uiRef}></div>;
};

export default FirebaseAuth;
