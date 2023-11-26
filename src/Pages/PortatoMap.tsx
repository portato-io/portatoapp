import React, { useEffect, useRef, useState } from 'react';
import PageLayout from './Layouts/PageLayoutTest';
import {
  fetchDataOnce,
  fetchGeoData,
  fetchAllRequests,
  fetchAllRoutes,
} from '../linksStoreToFirebase';
import { useAuth } from '../Components/AuthProvider';
import { useTranslation } from 'react-i18next';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebaseConfig';
import Map from '../Components/Map';
import { IRequestInfo, IRouteInfo, MapMarker } from '../type';
import AllRequests from './Admin/AllRequests';
import { features } from 'process';
interface Coordinates {
  type: 'Point';
  coordinates: [number, number];
}

const PortatoMap: React.FC = () => {
  const { user } = useAuth();
  const [geoRequestData, setGeoRequestData] = useState<
    Array<{ address: number[]; description: string; name: string }>
  >([]);
  const [geoRouteData, setGeoRouteData] = useState<
    Array<{ address: string; destination: string }>
  >([]);

  const [requests, setRequests] = useState([
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

  const [routes, setRoutes] = useState([
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.8322734, 46.8196535] as [number, number],
      },
      class: 'car-marker',
      name: 'test marker',
      description: 'test description',
    },
  ]);

  const fetchRequestData = async () => {
    if (!user) {
      console.log('user is undefined');
      return;
    }
    try {
      const fetchRequests = await fetchAllRequests();
      let requestDataArray: { userId: any; requests: IRequestInfo }[] = [];

      if (fetchRequests && fetchRequests.length > 0) {
        requestDataArray = fetchRequests; // Assign directly since the structure matches

        // Extracting delivery_addresses from the requests
        const pickup_addresses: {
          address: number[];
          description: string;
          name: string;
        }[] = [];

        requestDataArray.forEach((item) => {
          Object.values(item.requests).forEach((request) => {
            pickup_addresses.push({
              address: request.pickup_lat_lng,
              description: request.description,
              name: request.name,
            });
          });
        });

        console.log(
          'Extracting pickup_addresses from requests: ',
          pickup_addresses
        );

        if (pickup_addresses.length > 0) {
          setGeoRequestData(pickup_addresses);
        }
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchRouteData = async () => {
    if (!user) {
      console.log('user is undefined');
      return;
    }
    try {
      const fetchRoutes = await fetchAllRoutes();
      let routeDataArray: { userId: any; routes: IRouteInfo }[] = [];

      if (fetchRoutes && fetchRoutes.length > 0) {
        routeDataArray = fetchRoutes; // Assign directly since the structure matches

        // Extracting departure from the requests
        const departure_addresses: {
          address: string;
          destination: string;
        }[] = [];

        routeDataArray.forEach((item) => {
          Object.values(item.routes).forEach((route) => {
            departure_addresses.push({
              address: route.departure_adress,
              destination: route.destination_adress,
            });
          });
        });

        console.log(
          'Extracting departure_addresses from requests: ',
          departure_addresses
        );

        if (departure_addresses.length > 0) {
          setGeoRouteData(departure_addresses);
        }
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    fetchRequestData();
    fetchRouteData();
  }, [user?.uid]); // Fetch geoData when the user's UID changes

  useEffect(() => {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    const descriptions: string[] = [];
    const names: string[] = [];

    //       latitudes.push(lng);
    //       longitudes.push(lat);
    //       descriptions.push(requestObj.description);
    //       names.push(requestObj.name);
    //     }
    //   } catch (error) {
    //     console.error(`Error geocoding address: ${requestObj.address}`, error);
    //   }
    // };

    if (geoRequestData && geoRequestData.length > 0) {
      (async () => {
        for (const address of geoRequestData) {
          // await handleAddress(address);
        }

        const newRequestsFromDatabase = latitudes.map((lng, idx) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [latitudes[idx], longitudes[idx]] as [number, number], // Use "as [number, number]" for casting
          },
          class: 'box-marker',
          description: descriptions[idx],
          name: names[idx],
        }));

        setRequests((prevRequests) => [
          ...prevRequests,
          ...newRequestsFromDatabase,
        ]);
      })();
    }
  }, [geoRequestData]);

  useEffect(() => {
    console.log('Updated test:', requests);
  }, [requests]);

  return (
    <PageLayout>
      <section className="section mod-nomargin-top">
        <h1>Map</h1>
      </section>
      <section className="section section-bleed portato-map">
        <Map geoDatas={requests} />
      </section>
    </PageLayout>
  );
};

export default PortatoMap;
