import React, { useEffect, useRef, useState } from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { fetchGeoData } from '../linksStoreToFirebase';
import { useAuth } from '../Components/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import Map from '../Components/Map';
import { IRequestInfo, MapMarker } from '../type';

const PortatoMap: React.FC = () => {
  const { user } = useAuth();
  const [geoData, setGeoData] = useState<MapMarker[]>([]);

  useEffect(() => {
    if (!user) {
      console.log('user is undefined');
      return;
    }

    const fetchData = async () => {
      try {
        const fetchData = await fetchGeoData(user.uid, 'requests');
        let geoDataArray: MapMarker[] = [];

        // Check if fetchData is not null or undefined before returning it
        if (fetchData) {
          geoDataArray = Object.values(fetchData) as MapMarker[];

          // Check if fetchData is an object before returning it
          if (fetchData && typeof fetchData === 'object') {
            geoDataArray = Object.values(fetchData) as MapMarker[];
            setGeoData(geoDataArray);
          } else {
            console.log('Data is not an object:', fetchData);
          }

          setGeoData(geoData);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchData();
  });

  return (
    <PageLayout>
      <section className="section mod-nomargin-top">
        <h1>Map</h1>
      </section>
      <section className="section section-bleed portato-map">
        <Map />
      </section>
    </PageLayout>
  );
};

export default PortatoMap;
