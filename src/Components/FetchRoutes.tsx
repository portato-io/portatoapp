import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRouteInfo } from '../type';
import { Card } from 'antd';
import { useNavigate } from 'react-router';

const FetchRoutes: React.FC<{
  uid: string | null | undefined;
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [routes, setRoute] = useState<IRouteInfo[]>([]);
  const navigate = useNavigate();

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    // TODO: Handle uid undefined case
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = fetchDataOnce(uid, 'routes').then((storesObject) => {
      // Check if storesObject is an object before returning it
      console.log('storesObject ' + JSON.stringify(storesObject));
      if (storesObject && typeof storesObject === 'object') {
        const storesArray = Object.values(storesObject) as IRouteInfo[]; // Type assertion here
        console.log('route info is ', storesArray);
        return storesArray;
      } else {
        console.log('Data is not an object:', storesObject);
        return [];
      }
    });

    const getUserRoutes = async () => {
      try {
        setRoute(await fetchData);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserRoutes();
  }, [uid]);

  const match = (routeId: string, routeUid: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const containerHeight = window.innerHeight * heightPortion;
  return (
    <div>
      <div
        style={
          admin ? {} : { height: containerHeight + 'px', overflowY: 'scroll' }
        }
      >
        {routes.map((route) => (
          <div
            key={route.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card style={{ marginTop: '5vh', width: '80%' }} title={route.id}>
              {route.departure_adress}/{route.destination_adress}
              {admin ? <pre>{JSON.stringify(route, null, 2)}</pre> : null}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchRoutes;
