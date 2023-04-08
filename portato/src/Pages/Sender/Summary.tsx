import React from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import { Typography, Card, ConfigProvider} from 'antd';
import ProgressBar from "../../Components/ProgressBar";
import ConfirmButtom from "../../Components/Buttons/ConfirmButton";
import BackButton from "../../Components/Buttons/BackButton";

const { Title } = Typography;
const progress = 100

const Summary: React.FC = () => {
    const nextScreen = "/"
    return (
        <PageLayout>
            <ProgressBar progress = {progress}/>
              <Card bordered={true} style={{marginLeft:'10%', width:'80%', marginTop:'40%',backgroundColor:"#FFF4E4"}}>
                <Title level = {2}> Summary </Title>
                        <div >
                            <Title level = {4}> Title</Title>
                        </div>
                        <div >
                            <Title level = {4}> Pickup address</Title>
                        </div>
                        <div >
                            <Title level = {4}> Delivery address</Title>
                        </div>
                        <div >
                            <Title level = {4}> Time</Title>
                        </div>
                        <div >
                            <Title level = {4}> Price</Title>
                        </div>
            </Card>
            <ConfirmButtom/>
            <BackButton/>
        </PageLayout>
  );
};

export default Summary;
