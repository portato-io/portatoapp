import React from "react";
import PageLayout from "../PageLayout"
import { Typography, Form, Input, Card} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'
import ConfirmButtom from "../../Components/ConfirmButton";

const { Title } = Typography;

const Summary: React.FC = () => {
    const nextScreen = "/"
    return (
        <PageLayout>
              <Card bordered={false} style={{backgroundColor:"#FFF4E4"}}>
                        <div >
                            <Title> Title</Title>
                        </div>
                        <div >
                            <Title> Pickup address</Title>
                        </div>
                        <div >
                            <Title> Delivery address</Title>
                        </div>
                        <div >
                            <Title> Time</Title>
                        </div>
                        <div >
                            <Title> Price</Title>
                        </div>
            </Card>
            <ConfirmButtom/>
        </PageLayout>
  );
};

export default Summary;
