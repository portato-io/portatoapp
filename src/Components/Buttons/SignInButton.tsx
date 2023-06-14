// SignInButton.tsx
import React from 'react';
import { Button } from 'antd';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <div className="form-button-main form-button-right">
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
