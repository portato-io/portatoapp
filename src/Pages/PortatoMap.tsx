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
        // Assume that fetchedData is an array of objects, where each object has a 'requests' property
        const allRequests = fetchedData.flatMap((item) =>
          Object.values(item.requests as Record<string, IRequestInfo>).filter(
            (request) => request && request.pickup_coordinates
          )
        );
        setRequests(allRequests);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, []); // Fetch requests when the user's UID is available

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
