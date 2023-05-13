import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRouteInfo } from '../type';
import { Card } from 'antd';

const FetchRoutes: React.FC<{
  uid: string;
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid = undefined, heightPortion = 0.8, admin = false }) => {
  const [routes, setRoute] = useState<IRouteInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    let user_requests = new Promise<any>((resolve, reject) => {
      // Do nothing
    });

    // TODO: Handle uid undefined case
    const data = fetchDataOnce(uid, 'routes');
    if (data) {
      user_requests = data.then((storesArray) => {
        return storesArray;
      });
    }

    const getUserRoutes = async () => {
      const a = await user_requests;
      setRoute(Object.values(a));
    };

    getUserRoutes();
  }, []);
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
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchRoutes;
