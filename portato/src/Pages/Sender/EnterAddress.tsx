import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/NextButton";
import { Typography, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons'

const { Title } = Typography;

const EnterAddress: React.FC = () => {
    const nextScreen = "/enter_time"
    return (
        <PageLayout>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
            <Title style={{textAlign: 'center'}}>Pick-up address</Title>
            <Form.Item
                name="Pickup address"
            >
                <Input prefix = {<SearchOutlined/>}/>
            </Form.Item>

            <Title style={{textAlign: 'center'}}>Delivery address</Title>
            <Form.Item
                name="Delivery address"
            >
                <Input prefix = {<SearchOutlined/>}/>
            </Form.Item>

            </Form>

            <NextButton nextScreen = {nextScreen}/>
        </PageLayout>
  );
};

export default EnterAddress;
