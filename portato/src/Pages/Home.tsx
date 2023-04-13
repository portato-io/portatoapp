import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebaseConfig';
import PageLayout from "./Layouts/PageLayoutTest"

const { Title } = Typography;

const Home: React.FC = () => {

  const [routeData, setRouteData] = useState(null);
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate('/enterObjInfo');
    console.log('About to call fetchOpenRoute()');
    fetchOpenRoute();

    navigate('/send');
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
        <Title level={2} style={{ textAlign: 'center'}}>This is our home page</Title>
      </div>
    </PageLayout>
  );
};

export default Home;
