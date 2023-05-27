import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import '../PortatoStyleSheet.css';
import PageLayout from './Layouts/PageLayoutTest';
import { useParams } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSender: React.FC = () => {
  const { request_id } = useParams<{ request_id: string }>();
  const { request_uid } = useParams<{ request_uid: string }>();
  const [form] = Form.useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: FormData) => {
    setLoading(true);

    // Adding a hardcoded targetEmail
    const valuesWithUid = {
      ...values,
      uid: request_uid,
      message:
        'This message concerns the following request: ' +
        request_id +
        values.message, // add your line here
    };

    try {
      const result = await axios.post(
        'https://us-central1-portatoapp.cloudfunctions.net/sendEmailToUid',
        valuesWithUid
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};

export default ContactSender;
