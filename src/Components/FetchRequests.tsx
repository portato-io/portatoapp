import React, { useEffect, useState } from 'react';
import { fetchDataOnce } from '../linksStoreToFirebase';
import { IRequestInfo } from '../type';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setStatus, setRequest } from '../Store/actions/dealActionCreators';
import { updateMatched } from '../linksStoreToFirebase';
import { uploadDealToFirebase } from '../linksStoreToFirebase';

const FetchRequests: React.FC<{
  uid?: string | null; // uid is now optional
  heightPortion?: number;
  admin?: boolean;
}> = ({ uid, heightPortion = 0.8, admin = false }) => {
  const [requests, setRequestState] = useState<IRequestInfo[]>([]);
  const dispatch = useDispatch();
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

    const fetchData = fetchDataOnce(uid, 'requests').then((storesObject) => {
      // Check if storesObject is an object before returning it
      if (storesObject && typeof storesObject === 'object') {
        let storesArray = Object.values(storesObject) as IRequestInfo[]; // Type assertion here
        if (admin) {
          storesArray = storesArray.filter((request) => !request.matched);
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
    updateMatched(request, true);
    console.log('Creating deal with status Backlog for request: ' + request.id);
  };

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
              {admin ? <div>{`${request.id}/${request.uid}`}</div> : null}
              {admin ? <div>{`${request.matched}`}</div> : null}
              {admin && (
                <button onClick={() => match(request.id, request.uid)}>
                  Match
                </button>
              )}
              {admin && (
                <button onClick={() => noMatch(request)}>No Match</button>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchRequests;
