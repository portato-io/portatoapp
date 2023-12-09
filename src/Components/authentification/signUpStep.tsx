import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { SignUpFormValues } from './formDefinition';
import { message } from 'antd';

const SignUpStep: React.FC<{
  onSendSMS: (values: SignUpFormValues) => void;
}> = ({ onSendSMS }) => {
  const [form] = Form.useForm<SignUpFormValues>();
  const { t } = useTranslation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const onFinish = (values: SignUpFormValues) => {
    console.log('Success:', values);
    onSendSMS(values); // pass the form values to the SMS handler
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h4 className="title title-h4">{t('signIn.registrationTitle')}</h4>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
        }}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message:
                t('signIn.placeholderFirstName') || 'First Name is required',
            },
          ]}
        >
          <Input
            placeholder={t('signIn.placeholderFirstName') || 'First Name'}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message:
                t('signIn.placeholderLastName') || 'Last Name is required',
            },
          ]}
        >
          <Input placeholder={t('signIn.placeholderLastName') || 'Last Name'} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: t('signIn.placeholderEmail') || 'Email is required',
            },
          ]}
        >
          <Input placeholder={t('signIn.placeholderEmail') || 'Email'} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message:
                t('signIn.placeholderPassword') || 'Password is required',
            },
          ]}
        >
          <Input.Password
            placeholder={t('signIn.placeholderPassword') || 'Password'}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: t('signIn.placeholderPhone') || 'Phone is required',
            },
            // Other validation rules as needed
          ]}
        >
          <Input
            placeholder={t('signIn.placeholderPhone') || 'Phone'}
            onChange={(e) => {
              const value = e.target.value;
              // Regex to check if the phone number starts with "+" and is followed by digits
              const phoneRegex = /^\+\d+$/;
              if (value && !phoneRegex.test(value)) {
                // Manually setting the error if the phone number is invalid
                form.setFields([
                  {
                    name: 'phone',
                    errors: [
                      t(
                        'signIn.errorPhoneCountryCode',
                        'Phone number must include the country code'
                      ),
                    ],
                  },
                ]);
              } else {
                // Clearing the error when the value is valid or empty
                form.setFields([
                  {
                    name: 'phone',
                    errors: [],
                    value: value,
                  },
                ]);
              }
            }}
          />
          <p className="text-hint">{t('signIn.placeholderHintPhone')}</p>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            style={{ fontSize: '16px' }}
          >
            {t('signIn.acceptTermsText')}
            <a
              href="https://portato.io/termsAndconditions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'black',
                fontSize: '16px',
                textDecoration: 'underline',
              }} // Inline CSS for the link
            >
              {t('signIn.acceptTermsLink')}
            </a>
          </Checkbox>
        </Form.Item>

        <div id="recaptcha-container"></div>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!termsAccepted}>
            {t('signIn.registrationButton')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpStep;
