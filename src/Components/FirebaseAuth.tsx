import { useEffect, useRef, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { useTranslation } from 'react-i18next';
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { message } from 'antd';
import { ConfirmationResult } from 'firebase/auth'; // Import the type
import { linkWithCredential } from 'firebase/auth';
import InitialStep from './authentification/initialStep';
import SignUpStep from './authentification/signUpStep';
import SmsSentStep from './authentification/smsSent';
import SignedUpStep from './authentification/signedUpStep';
import PasswordReset from './authentification/passwordReset';

const FirebaseAuth: React.FC<{ onAuthSuccess?: () => void }> = ({
  onAuthSuccess,
}) => {
  const { t } = useTranslation<string>();
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
  // New state for the timer and button disabled state
  const [timer, setTimer] = useState<number | null>(null);

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
              message.success(t('signIn.captchaSuccessMessage'));
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

  useEffect(() => {
    // Start the countdown when the smsSent step is reached
    if (step === 'smsSent' && timer === null) {
      setTimer(30);
      const intervalId = setInterval(() => {
        setTimer((prevTimer) =>
          prevTimer && prevTimer > 0 ? prevTimer - 1 : 0
        );
      }, 1000);

      // Cleanup interval on component unmount or when leaving the smsSent step
      return () => clearInterval(intervalId);
    }
  }, [step, timer]);

  // Enable the button by resetting the timer when it reaches 0
  useEffect(() => {
    if (timer === 0) {
      setTimer(null); // Reset the timer to null to allow resending
    }
  }, [timer]);

  const onVerifyOtp = async () => {
    console.log('Verifying OTP');
    if (otp === null || otp === '') {
      console.log('otp null');
      return;
    }
    try {
      const result = await confirmationResult?.confirm(otp);
      if (result?.user) {
        // Link email and password if provided
        if (email && password) {
          const credential = EmailAuthProvider.credential(email, password);
          await linkWithCredential(result.user, credential);
        } else {
          console.log('Issue linking email and password to account');
          message.error(t('signIn.missingEmailOrPassword'));
        }
        setStep('signedUp');
        message.success(t('signIn.signupSuccessTitle'));
        handleAuthSuccess();
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      message.error(t('signIn.otpVerificationFailedMessage'));
    }
  };

  const onSendSMS = async () => {
    const currentEmail = emailRef.current?.value || '';
    const currentPassword = passwordRef.current?.value || '';
    setEmail(currentEmail);
    setPassword(currentPassword);
    console.log('Trying to send SMS');
    if (!isCaptchaVerified || !recaptchaVerifierRef.current) {
      message.error(t('signIn.captchaMissingMessage'));
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
    } catch (error) {
      console.error('SMS sending error:', error);
      message.error(t('signIn.smsSendingFailedMessage'));
    }
  };

  const signIn = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      message.error(t('signIn.missingEmailOrPassword'));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success(t('signIn.signInSuccessMessage'));
      handleAuthSuccess();
    } catch (error) {
      console.error(error);
      message.error(t('signIn.signInFailedMessage'));
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
      case 'resetPassword':
        setStep('initial');
        break;
      // Add other cases as necessary
      default:
        break;
    }
  };

  return (
    <div className="modal-content-wrapper">
      {/* Include back button for each step except 'initial' */}
      {step !== 'initial' && step !== 'signedUp' && (
        <div>
          <a onClick={goBack} className="text-link icon-link">
            <i className="icon icon-arrow-left"></i>
            <small>{t('signIn.back')}</small>
          </a>
          <div className="spacer-regular"></div>
        </div>
      )}
      {step === 'initial' && (
        <InitialStep
          setStep={setStep}
          emailRef={emailRef}
          passwordRef={passwordRef}
          signIn={signIn}
          t={t}
        />
      )}
      {step === 'signUp' && (
        <SignUpStep
          setStep={setStep}
          emailRef={emailRef}
          passwordRef={passwordRef}
          mynumber={mynumber}
          setnumber={setnumber}
          onSendSMS={onSendSMS}
          isCaptchaVerified={isCaptchaVerified}
          t={t}
        />
      )}
      {step === 'resetPassword' && <PasswordReset t={t} />}
      {step === 'smsSent' && (
        <SmsSentStep
          onSendSMS={onSendSMS}
          onVerifyOtp={onVerifyOtp}
          setotp={setotp}
          t={t}
        />
      )}
      {step === 'signedUp' && <SignedUpStep setStep={setStep} t={t} />}
    </div>
  );
};

export default FirebaseAuth;
