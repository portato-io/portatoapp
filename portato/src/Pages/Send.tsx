import React from "react";
import PageLayout from "./PageLayout"
import { Typography, Form, DatePicker, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons"

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Send: React.FC = () => {
  return (
    <PageLayout>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Create a new request" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>New request</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item label="When">
            <DatePicker />
        </Form.Item>


    </Form>
    </PageLayout>
  );
};

export default Send;
