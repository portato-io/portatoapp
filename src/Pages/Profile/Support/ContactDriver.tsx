import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import '../../../CSS/PortatoStyleSheet.css';
import PageLayout from '../../Layouts/PageLayoutTest';
import { useParams } from 'react-router-dom';
import {
  updateObjectStatus,
  addContactTimestamp,
  fetchSpecificObjects,
} from '../../../linksStoreToFirebase';
import { IRequestInfo } from '../../../type';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactDriver: React.FC = () => {
  const { route_uid } = useParams<{ route_uid: string }>();
  const { request_uid } = useParams<{ request_uid: string }>();
  const { request_id } = useParams<{ request_id: string }>();

  const [form] = Form.useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: FormData) => {
    setLoading(true);
    let request: IRequestInfo | null = null;
    try {
      const requestData = await fetchSpecificObjects(
        `users/${request_uid}/requests/${request_id}`
      );
      if (requestData && typeof requestData === 'object') {
        request = requestData as IRequestInfo;
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }

    // Check if request is not null
    if (!request) {
      message.error('Failed to fetch request data. Please try again.');
      setLoading(false);
      return;
    }

    // Construct HTML email content
    const emailContent = `
      <table>
        <tr><th>Pickup Address</th><td>${request.pickup_adress}</td></tr>
        <tr><th>Delivery Address</th><td>${request.delivery_adress}</td></tr>
        <tr><th>Date Range</th><td>From ${request.dateRange[0]} to ${request.dateRange[1]}</td></tr>
        <tr><th>Time</th><td>${request.time}</td></tr>
        <tr><th>Price</th><td>${request.price} CHF</td></tr>
        <tr><th>Weight</th><td>${request.weight}</td></tr>
        <tr><th>Size</th><td>${request.size}</td></tr>
        <tr><th>Description</th><td>${request.description}</td></tr>
      </table>
    `;

    let images: string[] = [];
    if (request.images && Array.isArray(request.images)) {
      images = request.images;
    }
    // Adding a hardcoded targetEmail
    // Adding a hardcoded targetEmail
    const valuesWithUid = {
      ...values,
      uid: route_uid,
      message: ' ' + emailContent + '\n' + values.message,
      images: images,
    };

    try {
      const result = await axios.post(
        'https://us-central1-portatoapp.cloudfunctions.net/sendEmailToUid',
        valuesWithUid
      );

      if (result.status === 200) {
        message.success('Email sent successfully!');
        form.resetFields();
        if (request_uid && request_id) {
          updateObjectStatus(request_uid, request_id, 'contacted', 'requests');
          addContactTimestamp(request_uid, request_id);
        } else {
          console.error('request_uid or request_id is undefined');
        }
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

export default ContactDriver;
