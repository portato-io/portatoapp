// SignInButton.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <>
      <div className="form-button-right">
        <button
          id="signinButton"
          className="button button-solid box-shadow box-radius-default box-shadow-effect"
          onClick={onClick}
          type="submit"
          form="myForm"
        >
          {t('navigationButton.signIn')}
        </button>
      </div>
    </>
  );
};

export default SignInButton;
