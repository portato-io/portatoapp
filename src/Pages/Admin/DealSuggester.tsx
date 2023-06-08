import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useParams } from 'react-router-dom';
import {
  setStatus,
  setRequest,
  setRoute,
} from '../../Store/actions/dealActionCreators';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import {
  uploadDealToFirebase,
  checkData,
  getUserTokens,
  fetchDataOnce,
} from '../../linksStoreToFirebase';
import { IRouteInfo, IRequestInfo } from '../../type';

const DealSuggester: React.FC = () => {
  const dispatch = useDispatch();
  const { route_id } = useParams<{ route_id: string }>();
  const { route_uid } = useParams<{ route_uid: string }>();
  const [requestID, setRequestID] = useState('');
  const [requestUID, setRequestUID] = useState('');
  if (!route_id) {
    console.error('route id is undefined');
    return null; // or redirect, show error, etc.
  }
  if (!route_uid) {
    console.error('route uid is undefined');
    return null; // or redirect, show error, etc.
  }

  useEffect(() => {
    if (!route_uid) {
      console.log('route uid is undefined');
      return;
    }

    const fetchRouteData = async () => {
      try {
        const routesObject = await fetchDataOnce(route_uid, 'routes');
        if (routesObject && typeof routesObject === 'object') {
          const routesArray = Object.values(routesObject) as IRouteInfo[];
          const route = routesArray.find((route) => route.id === route_id);
          if (route) {
            dispatch(setRoute(route));
          } else {
            console.error('Route not found: ', route_id);
          }
        } else {
          console.log('Data is not an object:', routesObject);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchRouteData();
  }, [route_uid, route_id, dispatch]);

  const suggestRequest = async (id: string, uid: string) => {
    // implement your function here
    try {
      console.log('Submitted id: ', id, 'Submitted uid: ', uid);

      const requestObject = await fetchDataOnce(uid, 'requests');
      if (requestObject && typeof requestObject === 'object') {
        const requestsArray = Object.values(requestObject) as IRequestInfo[];
        const request = requestsArray.find((request) => request.id === id);
        if (request) {
          dispatch(setRequest(request));
        } else {
          console.error('Request not found: ', id);
        }
      } else {
        console.log('Data is not an object:', requestObject);
      }

      dispatch(setStatus('Suggestion'));

      if (await checkData(uid, 'requests', id)) {
        message.success('Suggestion valid! Submitted successfully');
        uploadDealToFirebase(dispatch);

        const tokens = await getUserTokens(route_uid);

        console.log('tokens are: ', tokens);
        if (tokens) {
          tokens.forEach(async (token: any) => {
            // Prepare the request body
            const body = {
              title: 'New delivery suggestion',
              body: 'World',
              token: token,
            };

            // Make a POST request to the Firebase Function
            fetch(
              'https://europe-west1-portatoapp.cloudfunctions.net/sendNotification',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              }
            )
              .then((response) => response.json())
              .then((result) => {
                // Read result of the Cloud Function.
                console.log(result);
                message.success('Notification sent successfully');
              })
              .catch((error) => {
                // Getting the error details
                console.error(`error: ${error}`);
              });
          });
        }
      } else {
        message.error('Suggestion invalid');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`An error occurred: ${error.message}`);
      } else {
        message.error('An unexpected error occurred.');
      }
    }
  };

  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestID(event.target.value);
  };

  const handleUIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestUID(event.target.value);
  };

  const handleSubmit = () => {
    suggestRequest(requestID, requestUID);
  };

  return (
    <PageLayout>
      <h1>
        Input matching request for {route_id} of user {route_uid}
      </h1>
      <input
        type="text"
        value={requestID}
        onChange={handleIDChange}
        placeholder="Enter request ID"
      />
      <input
        type="text"
        value={requestUID}
        onChange={handleUIDChange}
        placeholder="Enter request UID"
      />
      <button onClick={handleSubmit}>Validate</button>
    </PageLayout>
  );
};

export default DealSuggester;
