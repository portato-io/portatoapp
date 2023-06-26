// SignInButton.tsx
import React from 'react';
import { Button } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { t } = useTranslation<string>(); // Setting the generic type to string
  return (
    <div className="form-button-right">
      <Button
        type="primary"
        size="large"
        onClick={onClick}
        style={{ width: '100%' }}
      >
        {t('navigationButton.signIn')}
      </Button>
    </div>
  );
};

export default SignInButton;
