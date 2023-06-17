// SignInButton.tsx
import React from 'react';
import { Button } from 'antd';
import { useContext } from 'react';
import { TranslationContext } from '../../Contexts/TranslationContext';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { t } = useContext(TranslationContext);
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2vh',
        right: '10vw',
        width: '45vw',
        background: 'white',
        marginBottom: '10vh',
      }}
    >
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
