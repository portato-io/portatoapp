import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../../../CSS/PortatoStyleSheet.css';
import PageLayout from '../../Layouts/ProfilePagesLayout';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation<string>();
  const [form] = Form.useForm<FormData>(); // <-- Change the type here
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: FormData) => {
    setLoading(true);

    const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

    try {
      const result = await axios.post(
        `https://us-central1-${projectId}.cloudfunctions.net/sendEmailToSupport`,
        values
      );

      if (result.status === 200) {
        message.success('Email sent successfully!');
        form.resetFields();
      } else {
        message.error('Failed to send email. Please try again.');
      }
    } catch (error) {
      message.error('Failed to send email. Please try again.');
    }

    setLoading(false);
  };

  return (
    <PageLayout>
      <div className="form-container">
        <Form form={form} onFinish={onFinish} className="centered-form">
          <Form.Item
            label={t('contactSupport.nameLabel')}
            name="name"
            rules={[
              {
                required: true,
                message:
                  t('contactSupport.nameErrorMessage') ||
                  'Please enter your name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('contactSupport.emailLabel')}
            name="email"
            rules={[
              {
                required: true,
                message:
                  t('contactSupport.emailErrorMessage') ||
                  'Please enter your e-mail address',
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('contactSupport.messageLabel')}
            name="message"
            rules={[
              {
                required: true,
                message:
                  t('contactSupport.messageErrorMessage') ||
                  'Please enter a message',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('contactSupport.sendButtonLabel')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};

export default ContactForm;
