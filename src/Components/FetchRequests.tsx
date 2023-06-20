import React, { useEffect, useState, useContext } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRequestInfo } from '../type';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setStatus, setRequest } from '../Store/actions/dealActionCreators';
import { updateRequestStatus } from '../linksStoreToFirebase';
import { uploadDealToFirebase } from '../linksStoreToFirebase';
import { TranslationContext } from '../Contexts/TranslationContext';
require('../CSS/Send.css');

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [requests, setRequestState] = useState<IRequestInfo[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useContext(TranslationContext);

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
        if (admin) {
          storesArray = storesArray.filter(
            (request) => request.status == 'unmatched'
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
        setRequestState(await fetchData);
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
    updateRequestStatus(request, 'no match');
    console.log('Creating deal with status Backlog for request: ' + request.id);
  };

  const contact = (requestUid: string, requestID: string) => {
    console.log('Contacting ' + requestUid + ' for request ' + requestID);
    navigate(`/contact_sender/${requestUid}/${requestID}`);
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
          >
            {request.weight}/{request.size}
            {admin ? <pre>{JSON.stringify(request, null, 2)}</pre> : null}
            {admin && (
              <button onClick={() => match(request.id, request.uid)}>
                Match
              </button>
            )}
            {admin && (
              <button onClick={() => noMatch(request)}>No Match</button>
            )}
            {!admin && request.status === 'matched' && (
              <button onClick={() => contact(request)}>Contact</button>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FetchRequests;
