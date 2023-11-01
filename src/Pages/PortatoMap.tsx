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

if (process.env.REACT_APP_GOOGLE_MAP_API_KEY)
  setKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
//setKey('AIzaSyC-PMx8EbunvBrNvmg2n-Ey0Bm_FBoZYqw')
interface Coordinates {
  type: 'Point';
  coordinates: [number, number];
}

const PortatoMap: React.FC = () => {
  const { user } = useAuth();
  const [geoData, setGeoData] = useState<string[]>();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [test, setTest] = useState([
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6322734, 46.5196535],
      },
      class: 'box-marker',
    },
  ]);

  const fetchData = async () => {
    if (!user) {
      console.log('user is undefined');
      return;
    }
    try {
      const fetchData = await fetchDataOnce(user.uid, 'requests');
      let geoDataArray: IRequestInfo[] = [];

      // Check if fetchData is not null or undefined before returning it
      if (fetchData) {
        // Check if fetchData is an object before returning it
        if (fetchData && typeof fetchData === 'object') {
          geoDataArray = Object.values(fetchData) as IRequestInfo[];
          const delivery_adresses = geoDataArray.map(
            (item) => item.pickup_adress
          );
          if (delivery_adresses) setGeoData(delivery_adresses);
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
  }, [user?.uid]); // Fetch geoData when the user's UID changes

  useEffect(() => {
    const latitudes: number[] = [];
    const longitudes: number[] = [];

    if (geoData && geoData.length > 0) {
      const promises = geoData.map((address) => {
        return fromAddress(address)
          .then(({ results }) => {
            if (
              results[0] &&
              results[0].geometry &&
              results[0].geometry.location
            ) {
              const { lat, lng } = results[0].geometry.location;
              latitudes.push(lat);
              longitudes.push(lng);
            }
          })
          .catch(console.error);
      });

      Promise.all(promises).then(() => {
        console.log('PAAP', latitudes);
        const newDataFromDatabase = [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [latitudes[0], longitudes[0]],
            },
            class: 'box-marker',
          },
        ];

        // Use the previous state to generate a new array and set the state
        setTest((prevTest) => [...prevTest, ...newDataFromDatabase]);
        console.log('ALD', test);
      });
    }
  }, [geoData]);
  useEffect(() => {
    console.log('Updated test:', test);
  }, [test]);

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
