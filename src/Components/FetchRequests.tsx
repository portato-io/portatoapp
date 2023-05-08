import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IObjectInfo } from '../type';
import { Card } from 'antd';

const FetchRequests: React.FC<{ uid: string }> = ({ uid = undefined }) => {
  const [requests, setRequest] = useState<IObjectInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    let user_requests = new Promise<any>((resolve, reject) => {
      // DO nothing
    });

    // TODO: Handle uid undefined case
    const data = fetchDataOnce(uid);
    if (data) {
      user_requests = data.then((storesArray) => {
        return storesArray;
      });
    }

    const getUserRequests = async () => {
      const a = await user_requests;
      setRequest(Object.values(a));
    };

    getUserRequests();
  }, []);
  const containerHeight = window.innerHeight * 0.8;
  console.log(containerHeight + 'px');
  return (
    <div>
      <div style={{ height: containerHeight + 'px', overflowY: 'scroll' }}>
        {requests.map((request) => (
          <div
            key={request.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              style={{ marginTop: '5vh', width: '80%' }}
              title={request.name}
            >
              {request.weight}/{request.size}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchRequests;
