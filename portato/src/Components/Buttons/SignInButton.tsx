// SignInButton.tsx
import React from "react";
import { Button } from "antd";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <Button type="primary" onClick={onClick} style={{ margin: "16px" }}>
      Sign In
    </Button>
  );
};

export default SignInButton;
