import { useEffect, useRef, useState, useCallback } from 'react';
import 'firebaseui/dist/firebaseui.css';
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button, message } from 'antd';
import { ConfirmationResult } from 'firebase/auth'; // Import the type
import { linkWithCredential } from 'firebase/auth';

const FirebaseAuth: React.FC = () => {
  const [mynumber, setnumber] = useState('');
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [step, setStep] = useState('initial'); // 'initial', 'captchaVerified', 'smsSent', 'otpEntered', 'signedUp'

  // Initialize the reCAPTCHA verifier in useEffect when the sign-up process begins

  useEffect(() => {
    if (step === 'signUp' && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'normal',
          callback: (response: string) => {
            setIsCaptchaVerified(true);
            message.success('Captcha verification successful');
          },
        },
        auth
      );
      recaptchaVerifierRef.current.render();
    }

    // Cleanup function to reset reCAPTCHA
    return () => {
      if (window.recaptchaWidgetId !== undefined) {
        recaptchaVerifierRef.current?.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [step]);

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

  const onSendSMS = async () => {
    const currentEmail = emailRef.current?.value || '';
    const currentPassword = passwordRef.current?.value || '';
    setEmail(currentEmail);
    setPassword(currentPassword);
    console.log('Trying to send SMS');
    if (!isCaptchaVerified || !recaptchaVerifierRef.current) {
      message.error('Please complete the reCAPTCHA challenge.');
      return;
    }
    try {
      const result = await signInWithPhoneNumber(
        auth,
        mynumber,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(result);
      setStep('smsSent');
      message.success('SMS sent successfully. Please enter the OTP.');
    } catch (error) {
      console.error('SMS sending error:', error);
      message.error('Failed to send SMS');
    }
  };

  const onVerifyOtp = async () => {
    if (otp === null || otp === '') return;
    try {
      const result = await confirmationResult?.confirm(otp);
      if (result?.user) {
        // Link email and password if provided
        if (email && password) {
          const credential = EmailAuthProvider.credential(email, password);
          await linkWithCredential(result.user, credential);
        } else {
          message.success(
            'Failed to sign up due to missing email adress or password !'
          );
        }
        setStep('signedUp');
        message.success('Sign up successful!');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      message.error('Failed to verify OTP');
    }
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <center>
        {step === 'initial' && (
          <>
            <button onClick={() => setStep('signUp')}>Sign Up</button>
            <button onClick={() => setStep('signIn')}>Sign In</button>
          </>
        )}

        {step === 'signUp' && (
          <>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
              value={mynumber}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="Phone Number"
            />
            <div id="recaptcha-container"></div>
            {isCaptchaVerified && (
              <Button type="primary" onClick={onSendSMS}>
                Send SMS
              </Button>
            )}
          </>
        )}

        {step === 'smsSent' && (
          <>
            <input
              type="text"
              placeholder="Enter your OTP"
              onChange={(e) => setotp(e.target.value)}
            />
            <Button onClick={onVerifyOtp}>Verify</Button>
            <Button onClick={onSendSMS}>Resend SMS</Button>
          </>
        )}

        {step === 'signedUp' && (
          <div style={{ color: 'green', marginTop: '20px' }}>
            Sign up successful!
          </div>
        )}
      </center>
    </div>
  );
};

export default FirebaseAuth;
