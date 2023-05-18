import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IDealInfo } from '../type';
import { Card } from 'antd';

const FetchDeals: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [deals, setRequest] = useState<IDealInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    // TODO: Handle uid undefined case
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = fetchDataOnce(uid, 'deals').then((storesObject) => {
      // Check if storesObject is an object before returning it
      if (storesObject && typeof storesObject === 'object') {
        const storesArray = Object.values(storesObject) as IDealInfo[]; // Type assertion here
        return storesArray;
      } else {
        console.log('Data is not an object:', storesObject);
        return [];
      }
    });

    const getUserDeals = async () => {
      try {
        setRequest(await fetchData);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserDeals();
  }, [uid]);

  const containerHeight = window.innerHeight * heightPortion;
  return (
    <div>
      <div
        style={
          admin ? {} : { height: containerHeight + 'px', overflowY: 'scroll' }
        }
      >
        {deals.map((deal) => (
          <div
            key={deal.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              style={{ marginTop: '5vh', width: '80%' }}
              title={deal.status}
            >
              {deal.request_id}/{deal.route_id}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchDeals;
