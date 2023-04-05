import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import { Typography, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons'

const { Title } = Typography;

const EnterAddress: React.FC = () => {
    const nextScreen = "/enter_time"
    return (
        <PageLayout>
            <Form
            className="form-sender"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
            <Title style={{backgroundColor:"white", textAlign: 'center'}}>Pick-up address</Title>
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
            <BackButton/>
        </PageLayout>
  );
};

export default EnterAddress;
