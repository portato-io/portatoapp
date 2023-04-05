import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PageLayout from "./PageLayout"
import axios from 'axios';

const { Title } = Typography;

const Home: React.FC = () => {

  const [routeData, setRouteData] = useState(null);
  const navigate = useNavigate();

  const handleSendClick = () => {
      //fetchRoute();
    navigate('/send');
  };

  const handleDeliverClick = () => {
    navigate('/deliver');
  };


  const fetchRoute = async () => {
    const apiKey = process.env.REACT_APP_OPENROUTESERVICE_API_KEY;

    const coordinates = '8.681495,49.41461|8.686507,49.41943'; // Replace with your desired coordinates
    const profile = 'driving-car'; // Change the profile according to your needs (e.g., 'foot-walking', 'cycling-regular', etc.)

    const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&coordinates=${coordinates}`;

    try {
      const response = await axios.get(url);
      setRouteData(response.data);
      console.log(response.data, routeData);
    } catch (error) {
      console.error('Error fetching route data:', error);
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
