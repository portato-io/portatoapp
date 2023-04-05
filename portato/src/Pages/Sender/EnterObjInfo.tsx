import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import { Typography, Form, DatePicker, Upload, Input, Radio} from 'antd';
import {PlusOutlined} from "@ant-design/icons"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const EnterObjInfo: React.FC = () => {
  const nextScreen = "/enter_address"

  return (
    <PageLayout>
        <Title style={{background: "#fff", textAlign: 'center'}}> What would you like to ship</Title>
        <Form
          className="form-sender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
              <Input  placeholder="The title of your shipment"/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <TextArea rows={4} placeholder="eg: It’s a good idea to specify the dimensions of large items." maxLength={6} />

          </Form.Item>

          <Form.Item label="Size">
          <Radio.Group style={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <Radio value={1}>S</Radio>
            <Radio value={2}>M</Radio>
            <Radio value={3}>L</Radio>
            <Radio value={4}>XL</Radio>
          </Radio.Group>

          </Form.Item>

          <Form.Item label="Weight">

          <Radio.Group style={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <Radio.Button value="small">-5 kg</Radio.Button>
            <Radio.Button value="medium">5-20 kg</Radio.Button>
            <Radio.Button value="heavy">+20 kg</Radio.Button>
          </Radio.Group>

          </Form.Item>


          <Form.Item label="Upload images" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Image</div>
              </div>
            </Upload>
          </Form.Item>
          <NextButton nextScreen = {nextScreen}/>
          <BackButton/>
        </Form>

    </PageLayout>
  );
};

export default EnterObjInfo;
