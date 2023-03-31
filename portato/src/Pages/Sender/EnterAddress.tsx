import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/NextButton";
import { Typography, Form, DatePicker, Upload, Input, Radio} from 'antd';
import {PlusOutlined} from "@ant-design/icons"

const { Title } = Typography;
const { TextArea } = Input;

const EnterAddress: React.FC = () => {
    const nextScreen = "/"
    return (
        <PageLayout>
            <Title style={{textAlign: 'center'}}> addddd</Title>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
            <Form.Item
                label="Pickup address"
                name="Pickup address"

            >
                <Input placeholder="The title of your shipment"/>
            </Form.Item>

            </Form>

            <NextButton />
        </PageLayout>
  );
};

export default EnterAddress;
