import React from "react";
import PageLayout from "../Layouts/PageLayoutTest"
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Title } = Typography;
const progress = 25;

const CreateSendRequest: React.FC = () => {
    const nextScreen = "/enterObjInfo"
    const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/enterObjInfo');
  };
    return (
        <PageLayout>
            <Button type="primary" size="large" style={{ marginRight: '16px' }} onClick={handleSendClick}>Create new request</Button>
        </PageLayout>
  );
};

export default CreateSendRequest;
