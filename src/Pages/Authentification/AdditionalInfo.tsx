import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import PageLayout from '../Layouts/PageLayoutTest';
import { useTranslation } from 'react-i18next';

const AdditionalInfo = () => {
  const { t } = useTranslation<string>();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // You can perform actions like sending the data to a server here
  };

  return (
    <PageLayout>
      <section className="section section-form mod-nomargin-top">
        <Form
          name="myForm"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ marginTop: '5vh' }}
        >
          <h2>{t('additionalInfo.title')}</h2>
          <Form.Item
            label={t('additionalInfo.address')}
            name="address"
            className="input-wrapper"
            rules={[
              {
                required: true,
                message: 'Please enter your address!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Phone Number Field */}
          <Form.Item
            className="input-wrapper"
            label={t('additionalInfo.phoneNum')}
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Please enter your phone number!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Birthday Field */}
          <Form.Item
            className="input-wrapper"
            label={t('additionalInfo.birthday')}
            name="birthday"
            rules={[
              {
                required: true,
                message: 'Please select your birthday!',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </section>
    </PageLayout>
  );
};

export default AdditionalInfo;
