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
  checkPreviousRoutes,
  updateMatched,
} from '../../linksStoreToFirebase';
import { IRouteInfo, IRequestInfo } from '../../type';

const DealSuggester: React.FC = () => {
  const dispatch = useDispatch();
  const { route_id } = useParams<{ route_id: string }>();
  const { route_uid } = useParams<{ route_uid: string }>();
  const [ID, setID] = useState('');
  const [UID, setUID] = useState('');
  const [isVerified, setIsVerified] = useState(false); // new state for verifying the click of verify button
  const [currentRoute, setCurrentRoute] = useState<IRouteInfo | null>(null); // store the current route
  const [currentRequest, setCurrentRequest] = useState<IRequestInfo | null>(
    null
  ); // store the current request
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
        const requestObject = await fetchDataOnce(route_uid, 'requests');
        if (requestObject && typeof requestObject === 'object') {
          const requestArray = Object.values(requestObject) as IRequestInfo[];
          const request = requestArray.find(
            (request) => request.id === route_id
          );
          if (request) {
            dispatch(setRequest(request));
            setCurrentRequest(request); // update the current request state
          } else {
            console.error('Route not found: ', route_id);
          }
        } else {
          console.log('Data is not an object:', requestObject);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchRouteData();
  }, [route_uid, route_id, dispatch]);

  const verifySuggestion = async (id: string, uid: string) => {
    // implement your function here
    try {
      console.log('Submitted id: ', id, 'Submitted uid: ', uid);

      const routesObject = await fetchDataOnce(uid, 'routes');
      if (routesObject && typeof routesObject === 'object') {
        const routesArray = Object.values(routesObject) as IRouteInfo[];
        const route = routesArray.find((route) => route.id === id);
        if (route) {
          dispatch(setRoute(route));
          setCurrentRoute(route); // update the current route state
        } else {
          console.error('Route not found: ', id);
        }
      } else {
        console.log('Data is not an object:', routesObject);
      }

      dispatch(setStatus('Suggestion'));

      if (await checkData(uid, 'routes', id)) {
        message.success('Suggestion valid!');
        if (currentRequest) {
          if (await checkPreviousRoutes(currentRequest.id, id)) {
            setIsVerified(true); // setting isVerified to true after verification is successful
          } else {
            message.error('Route already suggested in the past!');
          }
        } else {
          message.error('Error fetching request data!');
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

  const submitSuggestions = async () => {
    try {
      updateMatched(true);
      uploadDealToFirebase(dispatch);
      if (currentRequest) {
        const tokens = await getUserTokens(currentRequest.id);

        console.log('tokens are: ', tokens);
        if (tokens) {
          tokens.forEach(async (token: any) => {
            // Prepare the request body
            const notificationBody = {
              title: 'Potential delivery solution',
              body: 'We have found a match for your delivery request.',
              token: token,
            };

            // Make a POST request to the Firebase Function
            fetch(
              'https://europe-west1-portatoapp.cloudfunctions.net/sendNotification',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notificationBody),
              }
            )
              .then((response) => response.json())
              .then((result) => {
                // Read result of the Cloud Function.
                console.log(result);
                message.success('Notification Email sent successfully');
              })
              .catch((error) => {
                // Getting the error details
                console.error(`error: ${error}`);
              });
            const emailBody = {
              title: 'Potential delivery solution',
              body: 'We have found a match for your delivery request.',
              uid: UID,
            };

            fetch(
              'https://europe-west1-portatoapp.cloudfunctions.net/sendNotificationEmail',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailBody),
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
    setID(event.target.value);
  };

  const handleUIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUID(event.target.value);
  };

  const handleSubmit = () => {
    verifySuggestion(ID, UID);
  };

  return (
    <PageLayout>
      <h1>
        Input matching request for {route_id} of user {route_uid}
      </h1>
      <input
        type="text"
        value={ID}
        onChange={handleIDChange}
        placeholder="Enter request ID"
      />
      <input
        type="text"
        value={UID}
        onChange={handleUIDChange}
        placeholder="Enter request UID"
      />
      <button onClick={handleSubmit}>Verify</button>

      {/* Displaying route and request states if verification was done*/}
      {isVerified && (
        <>
          <h2>Route state:</h2>
          <pre>{JSON.stringify(currentRoute, null, 2)}</pre>
          <h2>Request state:</h2>
          <pre>{JSON.stringify(currentRequest, null, 2)}</pre>

          <button onClick={submitSuggestions}>Submit Suggestions</button>
        </>
      )}
    </PageLayout>
  );
};

export default DealSuggester;
