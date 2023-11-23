import React from 'react';
import { TFunction } from 'i18next'; // Assuming you are using i18next for the t function

interface SignedUpStepProps {
  setStep: (step: string) => void;
  t: TFunction; // Type accordingly if you are using a different method for translations
}

const SignedUpStep: React.FC<SignedUpStepProps> = ({ setStep, t }) => {
  return (
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
  );
};
export default SignedUpStep;
