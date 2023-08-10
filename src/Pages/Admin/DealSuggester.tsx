import React, { useEffect, useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useParams } from 'react-router-dom';
import {
  setStatus,
  setDealRequest,
  setInitRoute,
} from '../../Store/actions/dealActionCreators';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import {
  uploadDealToFirebase,
  checkData,
  getUserTokens,
  fetchDataOnce,
  checkPreviousRoutes,
  updateObjectStatus,
  updateRequestDealId,
} from '../../linksStoreToFirebase';
import { IRouteInfo, IRequestInfo } from '../../type';

const DealSuggester: React.FC = () => {
  const dispatch = useDispatch();
  const { request_id } = useParams<{ request_id: string }>();
  const { request_uid } = useParams<{ request_uid: string }>();
  const [ID, setID] = useState('');
  const [UID, setUID] = useState('');
  const [isVerified, setIsVerified] = useState(false); // new state for verifying the click of verify button
  const [currentRoute, setCurrentRoute] = useState<IRouteInfo | null>(null); // store the current route
  const [currentRequest, setCurrentRequest] = useState<IRequestInfo | null>(
    null
  ); // store the current request
  if (!request_id) {
    console.error('route id is undefined');
    return null; // or redirect, show error, etc.
  }
  if (!request_uid) {
    console.error('route uid is undefined');
    return null; // or redirect, show error, etc.
  }

  useEffect(() => {
    if (!request_uid) {
      console.log('route uid is undefined');
      return;
    }

    const fetchRouteData = async () => {
      try {
        const requestObject = await fetchDataOnce(request_uid, 'requests');
        if (requestObject && typeof requestObject === 'object') {
          const requestArray = Object.values(requestObject) as IRequestInfo[];
          const request = requestArray.find(
            (request) => request.id === request_id
          );
          if (request) {
            dispatch(setDealRequest(request));
            setCurrentRequest(request); // update the current request state
          } else {
            console.error('Route not found: ', request_id);
          }
        } else {
          console.log('Data is not an object:', requestObject);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchRouteData();
  }, [request_uid, request_id, dispatch]);

  const verifySuggestion = async (id: string, uid: string) => {
    // implement your function here
    try {
      console.log('Submitted id: ', id, 'Submitted uid: ', uid);

      const routesObject = await fetchDataOnce(uid, 'routes');
      if (routesObject && typeof routesObject === 'object') {
        const routesArray = Object.values(routesObject) as IRouteInfo[];
        const route = routesArray.find((route) => route.id === id);
        if (route) {
          dispatch(setInitRoute(route));
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
      if (currentRequest) {
        const dealId = await uploadDealToFirebase(dispatch);
        if (dealId === undefined) {
          message.error('failed to update dealid ');
          return;
        }
        updateRequestDealId(currentRequest, dealId);

        const tokens = await getUserTokens(currentRequest.uid);

        console.log('tokens are: ', tokens);
        if (tokens && tokens.length > 0) {
          // Prepare the request body
          const notificationBody = {
            title: 'Potential delivery solution',
            body: 'We have found a match for your delivery request.\n Plese go to your send request page to find more information',
            tokens: tokens, // Send the entire array of tokens
          };

          // Make a POST request to the Firebase Function
          try {
            const response = await fetch(
              'https://europe-west1-portatoapp.cloudfunctions.net/sendNotification',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notificationBody),
              }
            );

            const result = await response.json();
            // Read result of the Cloud Function.
            console.log(result);
            message.success('Notification sent successfully');
          } catch (error) {
            // Getting the error details
            console.error(`error: ${error}`);
          }
        }

        const emailBody = {
          title: 'Potential delivery solution',
          body: 'We have found a match for your delivery request. Please go to <a href="https://www.portato.io/profile/user_requests">your send request page</a> to find more information',
          uid: request_uid,
          admin: false,
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
            message.success('Notification email sent successfully');
            // we only updagte the status once we have been able to send the notification
            updateObjectStatus(
              currentRequest.uid,
              currentRequest.id,
              'matched',
              'requests'
            );
          })
          .catch((error) => {
            // Getting the error details
            console.error(`error: ${error}`);
          });
      } else {
        console.error('currentRequest is null');
        message.error('request is null');
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
        Input matching request for {request_id} of user {request_uid}
      </h1>
      <input
        type="text"
        value={ID}
        onChange={handleIDChange}
        placeholder="Enter route ID"
      />
      <input
        type="text"
        value={UID}
        onChange={handleUIDChange}
        placeholder="Enter route UID"
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
