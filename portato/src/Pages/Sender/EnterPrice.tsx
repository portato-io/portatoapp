import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/NextButton";
import { Typography, Form, Input, Card} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'

const { Title } = Typography;

const EnterPrice: React.FC = () => {
    const nextScreen = "/summary"
    return (
        <PageLayout>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
                <Title > How much is the transport cost for you?</Title>
                <Form.Item
                    name="Price"
                >
                    <Input placeholder="E.g : 30 CHF"/>
                </Form.Item>
                <Form.Item>
                    <Card bordered={true}>
                        <div style={{textAlign:"center"}}>
                            <InfoCircleOutlined />
                        </div>

                    Portato factors in the size of the vehicle, distance travelled and attractiveness for drivers to deliver it.
                    If your price is too low, chances are nobody will take your item.
                    </Card>
                </Form.Item>
            </Form>

            <NextButton nextScreen = {nextScreen}/>
        </PageLayout>
  );
};

export default EnterPrice;
