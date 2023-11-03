import React, { useEffect, useRef, useState } from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import {
  fetchDataOnce,
  fetchGeoData,
  fetchAllRequests,
} from '../linksStoreToFirebase';
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
  const [geoData, setGeoData] = useState<
    Array<{ address: string; description: string; name: string }>
  >([]);

  const [test, setTest] = useState([
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.6322734, 46.5196535] as [number, number],
      },
      class: 'box-marker',
      name: 'test marker',
      description: 'test description',
    },
  ]);

  const fetchData = async () => {
    if (!user) {
      console.log('user is undefined');
      return;
    }
    try {
      const fetchData = await fetchAllRequests();
      console.log(fetchData);
      let geoDataArray: { userId: any; requests: IRequestInfo }[] = [];

      if (fetchData && fetchData.length > 0) {
        geoDataArray = fetchData; // Assign directly since the structure matches

        // Extracting delivery_addresses from the requests
        const delivery_addresses: {
          address: string;
          description: string;
          name: string;
        }[] = [];

        geoDataArray.forEach((item) => {
          Object.values(item.requests).forEach((request) => {
            delivery_addresses.push({
              address: request.pickup_address,
              description: request.description,
              name: request.name,
            });
          });
        });

        console.log(
          'Extracting delivery_addresses from requests: ',
          delivery_addresses
        );

        if (delivery_addresses.length > 0) {
          setGeoData(delivery_addresses);
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
    const descriptions: string[] = [];
    const names: string[] = [];

    // Helper function to handle each address
    const handleAddress = async (requestObj: {
      address: string;
      description: string;
      name: string;
    }) => {
      try {
        const { results } = await fromAddress(requestObj.address);
        if (
          results &&
          results.length > 0 &&
          results[0].geometry &&
          results[0].geometry.location
        ) {
          const { lat, lng } = results[0].geometry.location;

          latitudes.push(lng);
          longitudes.push(lat);
          descriptions.push(requestObj.description);
          names.push(requestObj.name);
        }
      } catch (error) {
        console.error(`Error geocoding address: ${requestObj.address}`, error);
      }
    };

    if (geoData && geoData.length > 0) {
      (async () => {
        for (const address of geoData) {
          await handleAddress(address);
        }

        const newDataFromDatabase = latitudes.map((lng, idx) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [latitudes[idx], longitudes[idx]] as [number, number], // Use "as [number, number]" for casting
          },
          class: 'box-marker',
          description: descriptions[idx],
          name: names[idx],
        }));

        setTest((prevTest) => [...prevTest, ...newDataFromDatabase]);
      })();
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
