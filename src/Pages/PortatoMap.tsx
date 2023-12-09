import React, { useEffect, useState } from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { fetchAllRequests } from '../linksStoreToFirebase';
import { useAuth } from '../Components/AuthProvider';
import { IRequestInfo } from '../type';

import Map from '../Components/Map';

const PortatoMap: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<IRequestInfo[]>([]); // Assuming IRequestInfo is the type for your request data

  const fetchRequestData = async () => {
    try {
      const fetchedData = await fetchAllRequests();
      if (fetchedData && fetchedData.length > 0) {
        // Combine all requests from all users into a single array
        const allRequests = fetchedData.flatMap((item) => item.requests);
        setRequests(allRequests);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchRequestData();
    }
  }, [user?.uid]); // Fetch requests when the user's UID is available

  return (
    <PageLayout>
      <section className="section mod-nomargin-top">
        <h1>Map</h1>
      </section>
      <section className="section section-bleed portato-map">
        {/* Pass the raw requests data to the Map component */}
        <Map requests={requests} />
      </section>
    </PageLayout>
  );
};

export default PortatoMap;
