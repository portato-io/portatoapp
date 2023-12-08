import React from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SignUpFormValues } from './formDefinition';
import { message } from 'antd';

const SignUpStep: React.FC<{
  onSendSMS: (values: SignUpFormValues) => void;
}> = ({ onSendSMS }) => {
  const [form] = Form.useForm<SignUpFormValues>();
  const { t } = useTranslation();

  const onFinish = (values: SignUpFormValues) => {
    console.log('Success:', values);
    onSendSMS(values); // pass the form values to the SMS handler
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePhoneNumber = (_: any, value: string) => {
    if (value && !value.startsWith('+')) {
      message.error('Invalid phone number');
      const errorMessage = t(
        'signIn.errorPhoneCountryCode',
        'Phone number must include the country code'
      ); // Provide a default message
      message.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.resolve();
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
              if (value && !value.startsWith('+')) {
                // Manually setting the error
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
                // Clearing the error when the value is valid
                form.setFields([
                  {
                    name: 'phone',
                    errors: [],
                  },
                ]);
              }
            }}
          />
          <p className="text-hint">{t('signIn.placeholderHintPhone')}</p>
        </Form.Item>

        <div id="recaptcha-container"></div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('signIn.registrationButton')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpStep;
