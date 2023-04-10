import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageLayout from "./PageLayout"
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseConfig';



const { Title } = Typography;

const Home: React.FC = () => {

  const [routeData, setRouteData] = useState(null);
  const navigate = useNavigate();

  const handleSendClick = () => {
    console.log('About to call fetchOpenRoute()');
    fetchOpenRoute();

    navigate('/send');
  };

  const handleDeliverClick = () => {
    navigate('/deliver');
  };

  // Call the fetchOpenRoute function
const fetchOpenRoute = async () => {
  try {
    const fetchOpenRouteFunction = httpsCallable(functions, 'fetchOpenRoute');
    const response = await fetchOpenRouteFunction();
    console.log('Route data:', response.data);
} catch (error) {
    console.error('Error calling fetchOpenRoute function:', error);
}
};


  return (
    <PageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Title level={2} style={{ textAlign: 'center'}}>What do you want to do?</Title>
        <div style={{ display: 'flex', flexDirection:"row", marginTop: '24px' }}>
          <Button type="primary" size="large" style={{ marginRight: '16px' }} onClick={handleSendClick}>Send</Button>
          <Button size="large" onClick={handleDeliverClick}>Deliver</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
