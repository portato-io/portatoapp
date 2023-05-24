import { ref, onValue, get, set } from 'firebase/database';
import { database } from './firebaseConfig';
import { setObjectId, setReqUid } from './Store/actions/requestActionCreators';
import { setRouteId, setRouteUid } from './Store/actions/routeActionCreators';
import { setDealId } from './Store/actions/dealActionCreators';
import { store } from './index';
import { push as firebasePush } from 'firebase/database';

export const uploadRequestToFirebase = async (uid, dispatch) => {
  try {
    dispatch(setReqUid(uid));

    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/requests`);

    // Generate a new unique key for the request
    const newRequestRef = firebasePush(requestsRef);

    // The unique key is now available as newRequestRef.key
    if (newRequestRef.key) {
      dispatch(setObjectId(newRequestRef.key));
      const state = store.getState();

      // Update your data under the new key
      await set(newRequestRef, state.request);
    } else {
      console.error('Unable to generate a unique key.');
    }

    console.log('Request uploaded successfully');
  } catch (error) {
    console.error('Error uploading request:', error);
  }
};

async function createDirFirebase(name, uid) {
  // Creata an empty directory where the future matching routes will be stored
  const requestsRef = ref(database, `users/${uid}/${name}`);

  // Set the directory in the database
  await set(requestsRef, { dummy: true });

  console.log(
    'Created the dir successfully with the following adress: ',
    requestsRef
  );
}

export const uploadRouteToFirebase = async (uid, dispatch) => {
  try {
    dispatch(setRouteUid(uid));

    createDirFirebase('route_suggestions', uid);
    createDirFirebase('route_confirmed', uid);

    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/routes`);

    // Generate a new unique key for the request
    const newRequestRef = firebasePush(requestsRef);

    // The unique key is now available as newRequestRef.key
    if (newRequestRef.key) {
      dispatch(setRouteId(newRequestRef.key));
      const state = store.getState();

      // Update your data under the new key
      await set(newRequestRef, state.route);
    } else {
      console.error('Unable to generate a unique key.');
    }
  } catch (error) {
    console.error('Error creating suggestions: ', error, 'user: ', uid);
  }
};

export const fetchDataOnce = async (uid, directory) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/${directory}`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const checkData = async (uid, directory, data_id) => {
  try {
    const userRequestsRef = ref(
      database,
      `users/${uid}/${directory}/${data_id}`
    );
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return true;
    } else {
      console.log('No data found.', userRequestsRef);
      return false;
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const uploadDealToFirebase = async (dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, 'deals');

    const newRequestRef = firebasePush(requestsRef);

    // The unique key is now available as newRequestRef.key
    if (newRequestRef.key) {
      dispatch(setDealId(newRequestRef.key));
      const state = store.getState();

      // Update your data under the new key
      await set(newRequestRef, state.deal);
    } else {
      console.error('Unable to generate a unique key.');
    }
  } catch (error) {
    console.error('Error creating suggestions: ', error);
  }
};

export const listenForDataChanges = () => {
  const reduxStoreRef = ref(database, 'reduxStore');

  onValue(
    reduxStoreRef,
    (snapshot) => {
      if (snapshot.exists()) {
        console.log('Data:', snapshot.val());
      } else {
        console.log('No data found.', userRequestsRef);
      }
    },
    (error) => {
      console.error('Error fetching data from Firebase:', error);
    }
  );
};

export const addNotificationsToken = async (uid, token) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/token`);

    // Update your data under the new key
    await set(requestsRef, token);
    console.log('Successfully added the token: ');
  } catch (error) {
    console.error('Error creating suggestions: ', error);
  }
};

export const getUserToken = async (uid) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/token`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const checkTokenExists = async (uid) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/token`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return true;
    } else {
      console.log('No data found.', userRequestsRef);
      return false;
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const fetchDeals = async () => {
  try {
    const userRequestsRef = ref(database, 'deals');
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const fetchAdressRequest = async (uid, id) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/requests/${id}`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const changeDealStatus = async (dealId, status) => {
  try {
    const dealRef = ref(database, 'deals/' + dealId);
    await set(dealRef, { status: status });

    console.log('Successfully updated data');
  } catch (error) {
    console.error('Error updating data:', error);
  }
};
