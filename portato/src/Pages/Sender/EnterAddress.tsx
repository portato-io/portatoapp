import React from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons'

const { Title } = Typography;
const progress = 25;

const EnterAddress: React.FC = () => {
    const nextScreen = "/enter_time"
    return (
        <PageLayout>
            <ProgressBar progress = {progress}/>
            <Form
            className="form-sender"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
            <Title level = {4} style={{backgroundColor:"white"}}>Pick-up address</Title>
            <Form.Item
                name="Pickup address"
            >
                <Input prefix = {<SearchOutlined/>} style = {{background :'', width:'90%'}}/>
            </Form.Item>

            <Title level = {4} style={{backgroundColor:"white"}}>Delivery address</Title>
            <Form.Item
                name="Delivery address"
            >
                <Input prefix = {<SearchOutlined/>} style = {{background :'', width:'90%'}}/>
            </Form.Item>

            </Form>

            <NextButton nextScreen = {nextScreen}/>
            <BackButton/>
        </PageLayout>
  );
};

export default EnterAddress;
