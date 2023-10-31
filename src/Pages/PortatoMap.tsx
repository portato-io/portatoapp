import React, { useEffect, useRef, useState } from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import { fetchDataOnce, fetchGeoData } from '../linksStoreToFirebase';
import { useAuth } from '../Components/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import Map from '../Components/Map';
import { IRequestInfo, MapMarker } from '../type';
import AllRequests from './Admin/AllRequests';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from 'react-geocode';
import { features } from 'process';

interface Coordinates {
  type: 'Point';
  coordinates: [number, number];
}

const PortatoMap: React.FC = () => {
  const { user } = useAuth();
  const [geoData, setGeoData] = useState<string>();

  const test = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6322734, 46.5196535],
      },
      class: 'box-marker',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6522778, 46.5196535],
      },
      class: 'car-marker',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.7022785, 46.5196535],
      },
      class: 'box-marker',
    },
  ];

  const fetchData = async () => {
    if (!user) {
      console.log('user is undefined');
      return;
    }
    try {
      const fetchData = await fetchDataOnce(user.uid, 'requests');
      // console.log('AAAH', Object.values(fetchData));
      let geoDataArray: IRequestInfo[] = [];

      // Check if fetchData is not null or undefined before returning it
      if (fetchData) {
        // geoDataArray = Object.values(fetchData) as IRequestInfo[];
        // console.log('MAAAAAAM', geoDataArray);
        // Check if fetchData is an object before returning it
        if (fetchData && typeof fetchData === 'object') {
          geoDataArray = Object.values(fetchData) as IRequestInfo[];
          console.log('PAAAAAAAAAAP', geoDataArray[0].delivery_adress);
          setGeoData(geoDataArray[0].delivery_adress);
        } else {
          console.log('Data is not an object:', fetchData);
        }
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(geoData);
    if (geoData)
      fromAddress(geoData)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          console.log('MAMAN', lat, lng);
        })
        .catch(console.error);
  }, [user?.uid]);

  return (
    <PageLayout>
      <section className="section mod-nomargin-top">
        <h1>Map</h1>
      </section>
      <section className="section section-bleed portato-map">
        <Map geoDatas={test} />
      </section>
    </PageLayout>
  );
};

export default PortatoMap;
