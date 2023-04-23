import React from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import { Typography, Card, ConfigProvider} from 'antd';
import ProgressBar from "../../Components/ProgressBar";
import ConfirmButtom from "../../Components/Buttons/ConfirmButton";
import BackButton from "../../Components/Buttons/BackButton";

import { useSelector } from "react-redux";
import {ObjectInfoState, IObjectInfo} from '../../type'
    import { fetchDataOnce } from "../../linksStoreToFirebase";

const { Title } = Typography;
const progress = 100

const Summary: React.FC = () => {
    const nextScreen = "/"
    const objecInfo = useSelector((state: IObjectInfo) => state);
    console.log(objecInfo)
    // Fetch data once
    fetchDataOnce();

    return (
        <PageLayout>
            <ProgressBar progress = {progress}/>
              <Card bordered={true} style={{marginLeft:'10%', width:'80%', marginTop:'20%',backgroundColor:"#FFF4E4"}}>
                <Title level = {2}> Summary </Title>
                        <div >
                            <Title level = {4}>  {objecInfo.name}</Title>
                            <Typography >  {objecInfo.description} / Size: {objecInfo.size} / Weight: {objecInfo.weight}</Typography>
                        </div>
                        <div >
                            <Title level = {4}> Pickup address</Title>
                            <Typography >  {objecInfo.pickup_adress} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> Delivery address</Title>
                            <Typography >  {objecInfo.delivery_adress} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> {objecInfo.dateRange[0]} - {objecInfo.dateRange[1]}</Title>
                            <Typography >  In: {objecInfo.time} </Typography>
                        </div>
                        <div >
                            <Title level = {4}> Price</Title>
                            <Typography >  {objecInfo.price} CHF </Typography>
                        </div>
                        <div >
                            <Title level = {4}> Images</Title>
                            <Typography >  {objecInfo.price} CHF </Typography>
                        </div>
            </Card>
            <ConfirmButtom/>
            <BackButton/>
        </PageLayout>
  );
};

export default Summary;
