import React, { useEffect, useState, useContext } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRequestInfo } from '../type';
import { Card, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setStatus, setRequest } from '../Store/actions/dealActionCreators';
import {
  updateRequestStatus,
  fetchRouteUidFromDeal,
  uploadDealToFirebase,
} from '../linksStoreToFirebase';
import { useTranslation } from 'react-i18next';
require('../CSS/Send.css');
require('../CSS/PortatoStyleSheet.css');

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [requests, setRequestState] = useState<IRequestInfo[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation<string>(); // Setting the generic type to string

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
        let storesArray = Object.values(storesObject) as IRequestInfo[]; // Type assertion here

        // Filter out 'delivery confirmed' requests
        storesArray = storesArray.filter(
          (request) => request.status !== 'delivery confirmed'
        );

        // If the user is an admin, only return 'unmatched' requests
        if (admin) {
          storesArray = storesArray.filter(
            (request) =>
              request.status === 'unmatched' || request.status === 'new driver'
          );
        }

        return storesArray;
      } else {
        console.log('Data is not an object:', storesObject);
        return [];
      }
    });

    const getUserRequests = async () => {
      try {
        const requests = await fetchData;
        // Sort requests to have 'matched' and then 'contacted' requests at the top
        const sortedRequests = requests.sort((a, b) => {
          if (a.status === 'matched') {
            return -1;
          } else if (b.status === 'matched') {
            return 1;
          } else if (a.status === 'contacted') {
            return -1;
          } else if (b.status === 'contacted') {
            return 1;
          }
          return 0;
        });

        setRequestState(sortedRequests);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    getUserRequests();
  }, [uid]);

  const match = (routeId: string, routeUid: string) => {
    console.log('Matching route with id: ' + routeId);
    navigate(`/admin/deal_suggester/${routeId}/${routeUid}`);
  };

  const noMatch = (request: IRequestInfo) => {
    dispatch(setRequest(request));
    dispatch(setStatus('No Match'));
    uploadDealToFirebase(dispatch);
    updateRequestStatus(request.uid, request.id, 'no match');
    console.log('Creating deal with status Backlog for request: ' + request.id);
  };

  const contact = async (request: IRequestInfo) => {
    try {
      const uid = await fetchRouteUidFromDeal(request.dealId); // We use await here to resolve the Promise
      if (uid === undefined) {
        message.error('Error fetching driver information');
      } else {
        console.log('Contacting ' + uid);
        navigate(`/contact_driver/${uid}/${request.uid}/${request.id}`);
      }
    } catch (error) {
      console.log('Error in contacting: ', error);
    }
  };

  const getNewDriver = (request: IRequestInfo) => {
    updateRequestStatus(request.uid, request.id, 'unmatched');
  };

  const confirmDelivery = (request: IRequestInfo) => {
    updateRequestStatus(request.uid, request.id, 'delivery confirmed');
  };

  // Return early, if no requests exist; avoid adding the title altogether.
  if (requests.length === 0) {
    return null;
  }

  return (
    <div>
      {admin ? null : (
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
      )}
      {requests.map((request) => (
        <div key={request.name} className="current-send-requests-list">
          <Card
            className={`send-request-card ${
              request.status === 'matched' ? 'highlight-card' : ''
            }`}
            title={request.name}
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }} // added style here
          >
            <div>Price: {request.price} CHF</div>
            <div>
              Weight: {request.weight}/ Size: {request.size}
            </div>
            <div>Departure adress: {request.pickup_adress}</div>
            <div>Arrival Adress: {request.delivery_adress}</div>
            <div>
              Date range - From {request.dateRange[0]} - To{' '}
              {request.dateRange[1]}
            </div>
            <div>Time: {Object.values(requests[0].time)[0]}</div>
            <div>Description: {request.description}</div>
            <div>
              {admin ? <pre>{JSON.stringify(request, null, 2)}</pre> : null}
              {request.status === 'contacted' && (
                <p>
                  Contacted potential driver at{' '}
                  {new Date(request.contactTimestamp).toLocaleString()}
                </p>
              )}
            </div>

            <div style={{ alignSelf: 'flex-end' }}>
              {admin ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => match(request.id, request.uid)}
                  >
                    Match
                  </Button>
                  <Button type="primary" onClick={() => noMatch(request)}>
                    No Match
                  </Button>
                </>
              ) : (
                request.status === 'matched' && (
                  <Button type="primary" onClick={() => contact(request)}>
                    Contact
                  </Button>
                )
              )}

              {request.status === 'contacted' && (
                <>
                  <Button type="primary" onClick={() => getNewDriver(request)}>
                    Get New Driver
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => confirmDelivery(request)}
                  >
                    Confirm Delivery
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FetchRequests;
