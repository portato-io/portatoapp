import React, { RefObject } from 'react';
import { TFunction } from 'i18next'; // If you are using i18next for t function

// Define the interface for your component's props
interface SignUpStepProps {
  setStep: (step: string) => void;
  emailRef: RefObject<HTMLInputElement>; // Assuming emailRef is a ref to an input element
  passwordRef: RefObject<HTMLInputElement>; // Assuming passwordRef is a ref to an input element
  mynumber: string;
  setnumber: React.Dispatch<React.SetStateAction<string>>; // If setnumber is a setState function from useState hook
  onSendSMS: () => Promise<void>; // Assuming onSendSMS is an async function without parameters
  isCaptchaVerified: boolean;
  t: TFunction; // If you are using the t function from 'react-i18next', otherwise type accordingly
  firstNameRef: RefObject<HTMLInputElement>;
  lastNameRef: RefObject<HTMLInputElement>;
}

// Define your component with typed props
const SignUpStep: React.FC<SignUpStepProps> = ({
  setStep,
  emailRef,
  passwordRef,
  mynumber,
  setnumber,
  onSendSMS,
  isCaptchaVerified,
  t,
  firstNameRef,
  lastNameRef,
}) => {
  return (
    <>
      <h4 className="title title-h4">{t('signIn.registrationTitle')}</h4>
      <p className="text">{t('signIn.registrationText')}</p>
      <div className="section section-form section-bleed">
        <div className="input-wrapper">
          <input
            className="form-input"
            ref={firstNameRef}
            type="text"
            placeholder={t('signIn.placeholderFirstName') || 'First Name'}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="form-input"
            ref={lastNameRef}
            type="text"
            placeholder={t('signIn.placeholderLastName') || 'Last Name'}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="form-input"
            ref={emailRef}
            type="email"
            placeholder={t('signIn.placeholderEmail') || 'Your email address'}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="form-input"
            ref={passwordRef}
            type="password"
            placeholder={t('signIn.placeholderPassword') || 'Your password'}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="form-input"
            value={mynumber}
            type="tel"
            onChange={(e) => setnumber(e.target.value)}
            placeholder={t('signIn.placeholderPhone') || 'Your phone number'}
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
          )}
        </div>
      </div>
    </>
  );
};
export default SignUpStep;
