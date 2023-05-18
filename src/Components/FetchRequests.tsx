import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IObjectInfo } from '../type';
import { Card } from 'antd';

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [requests, setRequest] = useState<IObjectInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    const fetchRequests = async () => {
      if (uid) {
        // only fetch if uid is not undefined
        const data = await fetchDataOnce(uid, 'requests');
        if (data) {
          setRequest(Object.values(data));
        }
      }
    };
    fetchRequests();
  }, [uid]); // add uid as a dependency to the hook

  const containerHeight = window.innerHeight * heightPortion;
  return (
    <div>
      <div
        style={
          admin ? {} : { height: containerHeight + 'px', overflowY: 'scroll' }
        }
      >
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
