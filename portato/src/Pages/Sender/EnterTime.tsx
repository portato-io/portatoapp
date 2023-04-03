import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/NextButton";
import { Typography, Form, DatePicker, Radio, Checkbox} from 'antd';
import {SearchOutlined} from '@ant-design/icons'

const { Title } = Typography;
const { RangePicker } = DatePicker;
const plainOptions = ['Morning', 'Mid day', 'Evenings'];
const CheckboxGroup = Checkbox.Group;

const EnterTime: React.FC = () => {
    const nextScreen = "/enter_price"
    return (
        <PageLayout>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
            <Form.Item label = "Dates">
                <RangePicker />
            </Form.Item>

            <Form.Item label = "Time">
                <CheckboxGroup options={plainOptions}/>
            </Form.Item>

            </Form>

            <NextButton nextScreen = {nextScreen}/>
        </PageLayout>
  );
};

export default EnterTime;
