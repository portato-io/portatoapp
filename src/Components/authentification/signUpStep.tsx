import React from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SignUpFormValues } from './formDefinition';

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
          ]}
        >
          <Input placeholder={t('signIn.placeholderPhone') || 'Phone'} />
        </Form.Item>
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
