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
import { Button, message } from 'antd';
import { ConfirmationResult } from 'firebase/auth'; // Import the type
import { linkWithCredential } from 'firebase/auth';

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
      {/*
      {step === 'initial' && (
        <>
          
            <h4 className='title title-h4'>{t('signin.existingUserTitle')}</h4>
            <p className="text">{t('signin.existingUserText')}</p>
            <button className="button button-solid box-shadow box-radius-default box-shadow-effect" onClick={() => setStep('signIn')}>Sign In</button>
            <div className='spacer-regular'></div>
            <h4 className='title title-h4'>{t('signin.nonExistingUserTitle')}</h4>
            <p className="text">{t('signin.nonExistingUserText')}</p>
            <button className="button button-border button-border-light box-shadow box-radius-default box-shadow-effect" onClick={() => setStep('signUp')}>Sign Up</button>
        </>
      )}
      */}
      {step === 'initial' && (
        // Render the sign-in UI here
        <>
          <h4 className="title title-h4">{t('signIn.existingUserTitle')}</h4>
          <p className="text">{t('signIn.existingUserText')}</p>
          <div className="section section-form section-bleed">
            <div className="input-wrapper">
              <input
                className="form-input"
                ref={emailRef}
                type="email"
                placeholder="{t('signIn.placeholderEmail')}"
              />
            </div>
            <div className="input-wrapper">
              <input
                className="form-input"
                ref={passwordRef}
                type="password"
                placeholder="*!{t('signIn.placeholderPassword')}!*"
              />
            </div>
            <div className="text-align-right">
              <button
                className="button button-solid box-shadow box-radius-default box-shadow-effect"
                onClick={signIn}
              >
                {t('navigationButton.signIn')}
              </button>
            </div>
          </div>

          <p className="text-note mod-nomargin-top">
            <strong>{t('signIn.nonExistingUserTitle')}</strong>
            <br />
            {t('signIn.nonExistingUserText')}
            <a className="text-link" onClick={() => setStep('signUp')}>
              {' '}
              {t('signIn.nonExistingUserLink')}
            </a>
          </p>
        </>
      )}

      {step === 'signUp' && (
        <>
          <h4 className="title title-h4">{t('signIn.registrationTitle')}</h4>
          <p className="text">{t('signIn.registrationText')}</p>
          <div className="section section-form section-bleed">
            <div className="input-wrapper">
              <input
                className="form-input"
                ref={emailRef}
                type="email"
                placeholder="{t('signIn.placeholderEmail')}"
              />
            </div>
            <div className="input-wrapper">
              <input
                className="form-input"
                ref={passwordRef}
                type="password"
                placeholder="{t('signIn.placeholderPassword')}"
              />
            </div>
            <div className="input-wrapper">
              <input
                className="form-input"
                value={mynumber}
                type="tel"
                onChange={(e) => setnumber(e.target.value)}
                placeholder="{t('signIn.placeholdePhone')}"
              />
              <p className="text-hint">{t('signIn.placeholderHintPhone')}</p>
            </div>
            <div id="recaptcha-container"></div>
            <div className="spacer-small"></div>
            <div className="text-align-right">
              {isCaptchaVerified && (
                <button
                  className="button button-solid box-shadow box-radius-default box-shadow-effect"
                  onClick={onSendSMS}
                >
                  {t('signIn.registrationButton')}
                </button>
                /* 
                <Button type="primary" onClick={onSendSMS}>
                  {t('signIn.registrationButton')}
                </Button>
                */
              )}
            </div>
          </div>
        </>
      )}

      {step === 'smsSent' && (
        <>
          <h4 className="title title-h4">{t('signIn.smsConfirmationTitle')}</h4>
          <p className="text">{t('signIn.smsConfirmationText')}</p>
          <div className="section section-form section-bleed">
            <div className="input-wrapper">
              <input
                className="form-input"
                type="number"
                placeholder="{t('signIn.placeholderSMS')}"
                onChange={(e) => setotp(e.target.value)}
              />
            </div>
            <div className="mod-display-flex mod-flex-space-between">
              <p className="text-note mod-nomargin-top">
                <a className="text-link" onClick={onSendSMS}>
                  {' '}
                  {t('signIn.smsConfirmationResend')}
                </a>
              </p>
              <button
                className="button button-solid box-shadow box-radius-default box-shadow-effect"
                onClick={onVerifyOtp}
              >
                {t('signIn.smsConfirmationButton')}
              </button>
            </div>
          </div>
        </>
      )}

      {step === 'signedUp' && (
        <>
          <h4 className="title title-h4">{t('signIn.signupSuccessTitle')}</h4>
          <p className="text">{t('signIn.signupSuccessText')}</p>
          <div className="spacer-small"></div>
          <button
            className="button button-solid box-shadow box-radius-default box-shadow-effect"
            onClick={() => setStep('initial')}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default FirebaseAuth;
