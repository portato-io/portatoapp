import React, { useEffect, useState, useContext } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRequestInfo } from '../type';
import { Card } from 'antd';
import { TranslationContext } from '../Contexts/TranslationContext';
require('../CSS/Send.css');

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const { t } = useContext(TranslationContext);
  const [requests, setRequest] = useState<IRequestInfo[]>([]);

  // Mehdi : Use Effect to only fetch the data once when the component is mount
  // fetchDataOnce return a Promise object, we need the .then to decode the promise and store the values
  // then we use await to store the values in state

  useEffect(() => {
    // TODO: Handle uid undefined case
    if (!uid) {
      console.log('uid is undefined');
      return;
    }

    const fetchData = fetchDataOnce(uid, 'requests').then((storesObject) => {
      // Check if storesObject is an object before returning it
      if (storesObject && typeof storesObject === 'object') {
        const storesArray = Object.values(storesObject) as IRequestInfo[]; // Type assertion here
        return storesArray;
      } else {
        console.log('Data is not an object:', storesObject);
        return [];
      }
    });

    const getUserRequests = async () => {
      try {
        setRequest(await fetchData);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserRequests();
  }, [uid]);

  const containerHeight = window.innerHeight * heightPortion;

  // Return early, if no requests exist; avoid adding the title altogether.
  if (requests.length === 0) {
    return null;
  }

  return (
    <div>
      <h1
        style={{
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {t('requestOverview.currentTitle')}
      </h1>
      {requests.map((request) => (
        <div key={request.name} className="current-send-requests-list">
          <Card className="send-request-card" title={request.name}>
            {request.weight}/{request.size}
            {admin ? <div>{`${request.id}/${request.uid}`}</div> : null}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FetchRequests;
