// SignInButton.tsx
import React from "react";
import { Button } from "antd";

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return (
    <div
      className="div_button_next"
      style={{
        position: "absolute",
        bottom: "10%",
        left: "45%",
        width: "50%",
        background: "#fff",
      }}
    >
      <Button
        type="primary"
        size="large"
        onClick={onClick}
        style={{ width: "100%" }}
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;
