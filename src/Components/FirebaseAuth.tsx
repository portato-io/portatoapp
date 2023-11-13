import React, { useEffect, useRef, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { uiInstance, uiConfig } from './firebaseUIInstance';
import { auth } from '../firebaseConfig';
import { Button, message } from 'antd';
import { ConfirmationResult } from 'firebase/auth'; // Import the type
import { linkWithCredential } from 'firebase/auth';

const configureCaptcha = () => {
  const test = document.getElementById('grecaptcha-button');
  console.log(test);
  let recaptchaVerifier;
  if (test) {
    console.log('create captcha');
    recaptchaVerifier = new RecaptchaVerifier(
      test,
      {
        size: 'invisible',
        callback: (response: any) => {
          console.log('hi', response);
          console.log('Recaptca varified');
        },
      },
      auth
    );
    console.log(recaptchaVerifier);
  }
};

const FirebaseAuth: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   configureCaptcha();
  //   // Update the signInSuccessUrl and callbacks in uiConfig
  //   uiConfig.signInOptions = [EmailAuthProvider.PROVIDER_ID];
  //   uiConfig.callbacks = {
  //     signInSuccessWithAuthResult: () => {
  //       window.location.replace(window.location.pathname);
  //       return false;
  //     },
  //   };

  //   // Start the FirebaseUI widget
  //   uiInstance.start('#firebaseui-auth-container', uiConfig);

  //   // Cleanup on unmount
  //   return () => {
  //     uiInstance.reset();
  //   };
  // }, []);
  const [mynumber, setnumber] = useState('');
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const createAccount = async () => {
    const verify = new RecaptchaVerifier('recaptcha-container', {}, auth);
    try {
      const result = await signInWithPhoneNumber(auth, mynumber, verify);
      setConfirmationResult(result); // Save the confirmation result
      alert('Code sent');
      setshow(true);
    } catch (error) {
      console.error(error);
    }
  };

  const ValidateOtp = async () => {
    if (otp === null || otp === '') return;
    try {
      const result = await confirmationResult?.confirm(otp);
      const email = emailRef.current?.value || ''; // Fallback to empty string if undefined
      const password = passwordRef.current?.value || ''; // Fallback to empty string if undefined

      const credential = EmailAuthProvider.credential(email, password);
      if (result?.user) {
        await linkWithCredential(result.user, credential);
        // Handle successful link here
        setIsSignUpSuccessful(true);
      }
    } catch (error) {
      console.error('Error during OTP validation or account linking:', error);
      // Handle errors here
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleBack = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <center>
        {!showSignUp && !showSignIn && (
          <>
            <button onClick={handleShowSignUp}>Sign Up</button>
            <button onClick={handleShowSignIn}>Sign In</button>
          </>
        )}

        {(showSignUp || showSignIn) && (
          <button onClick={handleBack}>Back</button>
        )}

        {showSignUp && (
          <div>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
              value={mynumber}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="Phone Number"
            />
            <br />
            <br />
            <div id="recaptcha-container"></div>
            <button onClick={createAccount}>Send SMS</button>
          </div>
        )}

        {showSignIn && (
          <div>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <br />
            <br />
            <button onClick={signIn}>Sign in</button>
          </div>
        )}

        <div
          style={{
            display: show ? 'block' : 'none',
          }}
        >
          <input
            type="text"
            placeholder={'Enter your OTP'}
            onChange={(e) => {
              setotp(e.target.value);
            }}
          ></input>

          <br />
          <br />
          <button onClick={ValidateOtp}>Verify</button>
        </div>
        {isSignUpSuccessful && (
          <div style={{ color: 'green', marginTop: '20px' }}>
            Sign up successful!
          </div>
        )}
      </center>
    </div>
  );
};

export default FirebaseAuth;
