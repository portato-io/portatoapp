import React from "react";
import PageLayout from "../PageLayout"
import NextButton from "../../Components/Buttons/NextButton";
import BackButton from "../../Components/Buttons/BackButton";
import ProgressBar from "../../Components/ProgressBar";
import { Typography, Form, Input, Card} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'

const { Title } = Typography;
const progress = 75;

const EnterPrice: React.FC = () => {
    const nextScreen = "/summary"
    return (
        <PageLayout>
            <ProgressBar progress = {progress}/>
            <Form
            className="form-sender"
            //labelCol={{ span: 4 }}
            //wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
                <Title level= {3} > How much is the transport cost for you?</Title>
                <Form.Item
                    name="Price"
                >
                    <Input placeholder="E.g : 30 CHF" style = {{width:'90%'}}/>
                </Form.Item>
                <Card bordered = {false} style={{ width : '80%', marginBottom:'10%'}}>
                    Driver reward: x <br/>
                    Portato fee: y <br/>
                    VAT: z <br/>
                    insurance: xy
                </Card>
                <Form.Item >
                    <Card bordered={true} style={{background:"#F8F9FE",width:"80%", left:'5%'}}>
                        <div style={{textAlign:"center"}}>
                            <InfoCircleOutlined />
                        </div>

                    Portato factors in the size of the vehicle, distance travelled and attractiveness for drivers to deliver it.
                    If your price is too low, chances are nobody will take your item.
                    </Card>
                </Form.Item>
            </Form>


            <NextButton nextScreen = {nextScreen}/>
            <BackButton/>

        </PageLayout>
  );
};

export default EnterPrice;
