import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const VerifyEmailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();

    const intervalId = setInterval(() => {
      const user = auth.currentUser;
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            // Go back to the previous page
            navigate(-1); // This will navigate back in history
          }
        });
      }
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  const resendEmail = () => {
    // Implement resend email logic here
  };

  return (
    <Result
      icon={<i className="far fa-envelope" style={{ fontSize: '72px' }}></i>}
      title="Verify Your Email"
      subTitle="We have sent an email with a confirmation link to your email address. 
                In order to complete the sign-up process, please click the confirmation link.
                If you did not receive the email, please check your spam folder or request a new one."
      extra={
        <Button type="primary" key="console" onClick={resendEmail}>
          Resend Email
        </Button>
      }
    />
  );
};

export default VerifyEmailScreen;
