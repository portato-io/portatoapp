import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { TFunction } from 'i18next';
import { message } from 'antd';

interface PasswordResetProps {
  t: TFunction; // Assuming you are using i18next for the t function
}

const PasswordReset: React.FC<PasswordResetProps> = ({ t }) => {
  const [email, setEmail] = useState<string>('');

  const sendResetEmail = async () => {
    if (email.trim() === '') {
      message.error(t('signIn.enterEmailError')); // Prompt user to enter an email if the field is empty
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      message.success(t('signIn.resetPasswordConfirmation')); // Handle the confirmation message
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        message.error(t('signIn.resetPasswordError')); // Handle the error message
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h4 className="title title-h4">{t('signIn.forgotPasswordTitle')}</h4>
      <p className="text">{t('signIn.forgotPasswordText')}</p>
      <div className="input-wrapper">
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('signIn.placeholderEmail') || 'Enter your email'}
        />
      </div>
      <div className="text-align-right">
        <button
          className="button button-solid box-shadow box-radius-default box-shadow-effect"
          onClick={sendResetEmail}
        >
          {t('signIn.resetPasswordButton')}
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
