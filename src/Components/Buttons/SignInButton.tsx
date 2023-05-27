// SignInButton.tsx
import React from 'react';
import { Button } from 'antd';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
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
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;
