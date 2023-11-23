import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../../../CSS/PortatoStyleSheet.css';
import PageLayout from '../../Layouts/ProfilePagesLayout';
import BackButton from '../../../Components/Buttons/BackButton';

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
      <div className="section">
        <h4 className="title title-h4">{t('navigationMenu.support')}</h4>
        <div className="spacer-regular"></div>
        <Form form={form} onFinish={onFinish} className="portato-form">
          <Form.Item
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
            <Input
              className="form-input"
              placeholder={t('contactSupport.nameLabel') || 'Your name'}
            />
          </Form.Item>

          <Form.Item
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
            <Input
              className="form-input"
              placeholder={t('contactSupport.emailLabel') || 'Your email'}
            />
          </Form.Item>

          <Form.Item
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
            <Input.TextArea
              className="form-input"
              placeholder={t('contactSupport.messageLabel') || 'Your message'}
            />
          </Form.Item>

          <Form.Item>
            <div className="mod-display-flex mod-flex-space-between">
              <BackButton />
              <Button
                className="button button-solid box-shadow box-radius-default box-shadow-effect"
                htmlType="submit"
                loading={loading}
              >
                {t('contactSupport.sendButtonLabel')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};

export default ContactForm;
