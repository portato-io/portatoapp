import React, { useState } from 'react';
import PageLayout from '../Layouts/PageLayoutTest';
import { useParams } from 'react-router-dom';
import {
  setStatus,
  setRequestId,
  setRouteId,
  setRouetUid,
  setRequestUid,
} from '../../Store/actions/dealActionCreators';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { uploadDealToFirebase, checkData } from '../../linksStoreToFirebase';

interface DealSuggesterProps {
  route_id: string;
  route_uid: string;
}

const DealSuggester: React.FC = () => {
  const dispatch = useDispatch();
  const { route_id } = useParams<{ route_id: string }>();
  const { route_uid } = useParams<{ route_uid: string }>();
  const [inputID, setinputID] = useState('');
  const [inputUID, setinputUID] = useState('');
  if (!route_id) {
    console.error('route id is undefined');
    return null; // or redirect, show error, etc.
  }
  if (!route_uid) {
    console.error('route uid is undefined');
    return null; // or redirect, show error, etc.
  }
  dispatch(setRouteId(route_id));
  dispatch(setRouetUid(route_uid));
  const suggestRequest = async (id: string, uid: string) => {
    // implement your function here
    try {
      console.log('Submitted id: ', id, 'Submitted uid: ', uid);
      dispatch(setRequestId(id));
      dispatch(setRequestUid(uid));
      dispatch(setStatus('Suggestion'));

      if (await checkData(uid, 'requests', id)) {
        message.success('Suggestion valid! Submitted successfully');
        uploadDealToFirebase(dispatch);
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
    setinputID(event.target.value);
  };

  const handleUIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputUID(event.target.value);
  };

  const handleSubmit = () => {
    suggestRequest(inputID, inputUID);
  };

  return (
    <PageLayout>
      <h1>
        Input matching request for {route_id} of user {route_uid}
      </h1>
      <input
        type="text"
        value={inputID}
        onChange={handleIDChange}
        placeholder="Enter request ID"
      />
      <input
        type="text"
        value={inputUID}
        onChange={handleUIDChange}
        placeholder="Enter request UID"
      />
      <button onClick={handleSubmit}>Validate</button>
    </PageLayout>
  );
};

export default DealSuggester;
