import React, { RefObject } from 'react';
import { TFunction } from 'i18next'; // Assuming you are using i18next for the t function

interface InitialStepProps {
  setStep: (step: string) => void;
  emailRef: RefObject<HTMLInputElement>; // Assuming emailRef is a ref to an input element
  passwordRef: RefObject<HTMLInputElement>; // Assuming passwordRef is a ref to an input element
  signIn: () => Promise<void>; // Assuming signIn is an async function without parameters
  t: TFunction; // Type accordingly if you are using a different method for translations
}

const InitialStep: React.FC<InitialStepProps> = ({
  setStep,
  emailRef,
  passwordRef,
  signIn,
  t,
}) => {
  return (
    <>
      <h4 className="title title-h4">{t('signIn.existingUserTitle')}</h4>
      <p className="text">{t('signIn.existingUserText')}</p>
      <div className="section section-form section-bleed">
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
        <div className="mod-display-flex mod-flex-space-between mod-flex-mobile-column-reverse">
          <div>
            <a
              className="text-link icon-link"
              onClick={() => setStep('resetPassword')}
            >
              <i className="icon icon-help"></i>
              {t('signIn.forgotPassword')}
            </a>
          </div>
          <div>
            <button
              className="button button-solid box-shadow box-radius-default box-shadow-effect"
              onClick={signIn}
            >
              {t('navigationButton.signIn')}
            </button>
            <div className="spacer-small"></div>
          </div>
        </div>
      </div>
      <h4 className="title title-h4">{t('signIn.nonExistingUserTitle')}</h4>
      <p>{t('signIn.nonExistingUserText')}</p>
      <a className="text-link icon-link" onClick={() => setStep('signUp')}>
        <i className="icon icon-arrow-right"></i>
        {t('signIn.nonExistingUserLink')}
      </a>
    </>
  );
};

export default InitialStep;
