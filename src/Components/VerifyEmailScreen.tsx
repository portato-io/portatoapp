import React from 'react';
import { Result, Button } from 'antd';

const VerifyEmailScreen: React.FC = () => {
  return (
    <Result
      icon={<i className="far fa-envelope" style={{ fontSize: '72px' }}></i>}
      title="Verify Your Email"
      subTitle="We have sent an email with a confirmation link to your email address. 
                In order to complete the sign-up process, please click the confirmation link.
                If you did not receive the email, please check your spam folder or request a new one."
      extra={
        <Button type="primary" key="console">
          Resend Email
        </Button>
      }
    />
  );
};

export default VerifyEmailScreen;
