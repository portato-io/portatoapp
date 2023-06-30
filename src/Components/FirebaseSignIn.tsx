import React, { useEffect, useRef } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { uiConfig, uiInstance } from './firebaseUIInstance';

const FirebaseSignIn: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (uiRef.current) {
      uiInstance.start(`#${uiRef.current.id}`, uiConfig);
    }

    // Cleanup on unmount
    return () => {
      uiInstance.reset();
    };
  }, []);

  return (
    <div>
      <h1>Please sign in:</h1>
      <div id="firebaseui-auth-container" ref={uiRef}></div>
    </div>
  );
};

export default FirebaseSignIn;
