import React, { useEffect } from 'react';
import { Result, Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const { Text, Link } = Typography;

const VerifyEmailScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const intervalId = setInterval(() => {
      const user = auth.currentUser;
      if (user) {
        console.log('Checking user email verification status...');
        user
          .reload()
          .then(() => {
            if (user.emailVerified) {
              console.log('User email is verified. Navigating back.');
              navigate(-1); // Navigate back in history
            } else {
              console.log('User email not yet verified.');
            }
          })
          .catch((error) => {
            console.error('Error reloading user data:', error);
          });
      } else {
        console.log('No current user found.');
      }
    }, 5000);

    // Clean up interval on component unmount
    return () => {
      console.log('Cleaning up verification check interval.');
      clearInterval(intervalId);
    };
  }, [navigate]);

  const resendEmail = () => {
    // Implement resend email logic here
  };

  return (
    <Result
      icon={<i className="far fa-envelope" style={{ fontSize: '72px' }}></i>}
      title="Verify Your Email"
      subTitle={
        <Space direction="vertical">
          <Text>
            We have sent an email with a confirmation link to your email
            address. In order to complete the sign-up process, please click the
            confirmation link. If you did not receive the email, please check
            your spam folder or request a new one.
          </Text>
          <Text>
            You should be redirected automatically once the verification is
            successful. If it doesn't work, please{' '}
            <Link onClick={() => navigate(-1)}>click here</Link> to go back.
          </Text>
        </Space>
      }
      extra={
        <Button type="primary" key="console" onClick={resendEmail}>
          Resend Email
        </Button>
      }
    />
  );
};

export default VerifyEmailScreen;
