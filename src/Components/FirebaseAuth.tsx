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
import { Button } from 'antd';

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
  const createAccount = async () => {
    const verify = new RecaptchaVerifier('recaptcha-container', {}, auth);
    try {
      await signInWithPhoneNumber(auth, mynumber, verify);
      alert('code sent');
      setshow(true);
    } catch (error) {
      console.error(error);
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.error(error);
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

  const ValidateOtp = () => {
    if (otp === null || final === null) return;
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <center>
        <div
          style={{
            display: !show ? 'block' : 'none',
          }}
        >
          <input ref={emailRef} type="email" placeholder="email" />
          <input ref={passwordRef} type="password" placeholder="password" />
          <input
            value={mynumber}
            onChange={(e) => {
              setnumber(e.target.value);
            }}
            placeholder="phone number"
          />
          <br />
          <br />
          <div id="recaptcha-container"></div>
          <button onClick={createAccount}>Sign up</button>
          <button onClick={signIn}>Sign in</button>
        </div>
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
      </center>
    </div>
  );
};

export default FirebaseAuth;
