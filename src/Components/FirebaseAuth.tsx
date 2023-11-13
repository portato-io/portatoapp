import { useEffect, useRef, useState } from 'react';
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

const FirebaseAuth: React.FC<{ onAuthSuccess?: () => void }> = ({
  onAuthSuccess,
}) => {
  const [mynumber, setnumber] = useState('');
  const [otp, setotp] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [step, setStep] = useState('initial'); // 'initial', 'captchaVerified', 'smsSent', 'otpEntered', 'signedUp'

  // Initialize the reCAPTCHA verifier in useEffect when the sign-up process begins
  useEffect(() => {
    setStep('initial');
    setnumber('');
    setotp('');
    setEmail('');
    setPassword('');
    setIsCaptchaVerified(false);
    setConfirmationResult(null);

    // Reset reCAPTCHA if needed
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }

    // Cleanup function
    return () => {
      // Reset all states to their initial values
      setStep('initial');
      setnumber('');
      setotp('');
      setEmail('');
      setPassword('');
      setIsCaptchaVerified(false);
      setConfirmationResult(null);

      // Clear and reset reCAPTCHA if needed
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (step === 'signUp') {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'normal',
            callback: () => {
              setIsCaptchaVerified(true);
              message.success('Captcha verification successful');
            },
          },
          auth
        );
      }
      recaptchaVerifierRef.current.render();
    } else {
      // Clear the reCAPTCHA when leaving the signUp step
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    }
  }, [step]); // Dependency array includes step

  const signIn = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      message.error('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Sign in successful!');
      handleAuthSuccess();
    } catch (error) {
      console.error(error);
      message.error('Sign in failed');
    }
  };

  const handleAuthSuccess = () => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  const goBack = () => {
    switch (step) {
      case 'signUp':
      case 'signIn':
        setStep('initial');
        break;
      case 'smsSent':
        setIsCaptchaVerified(false); // Reset captcha verification state
        setStep('signUp');

        break;
      // Add other cases as necessary
      default:
        break;
    }
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
        handleAuthSuccess();
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      message.error('Failed to verify OTP');
    }
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <center>
        {/* Include back button for each step except 'initial' */}
        {step !== 'initial' && (
          <Button onClick={goBack} style={{ marginBottom: '20px' }}>
            Back
          </Button>
        )}
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
        {step === 'signIn' && (
          // Render the sign-in UI here
          <>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <Button onClick={signIn}>Sign In</Button>
          </>
        )}
      </center>
    </div>
  );
};

export default FirebaseAuth;
