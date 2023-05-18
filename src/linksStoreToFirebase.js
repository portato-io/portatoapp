import { ref, onValue, get, set, push } from 'firebase/database';
import { database } from './firebaseConfig';
import { setObjectId } from './Store/actions/requestActionCreators';
import { setRouteId } from './Store/actions/routeActionCreators';
import { setDealId } from './Store/actions/dealActionCreators';
import { store } from './index';
import { push as firebasePush } from 'firebase/database';

export const uploadRequestToFirebase = async (uid, dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/requests`);

    // Generate a new unique key for the request
    const newRequestRef = firebasePush(requestsRef);

    // The unique key is now available as newRequestRef.key
    if (newRequestRef.key) {
      console.log('newRequestRef.key :', newRequestRef.key);

      let state = store.getState();

      console.log('state: ' + JSON.stringify(state.request));

      dispatch(setObjectId(newRequestRef.key));
      state = store.getState();

      console.log('state: ' + JSON.stringify(state.request));

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
    createDirFirebase('route_suggestions', uid);
    createDirFirebase('route_confirmed', uid);

    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/routes`);

    // Generate a new unique key for the request
    const newRequestKey = requestsRef.push().key;

    if (newRequestKey) {
      dispatch(setObjectId(newRequestKey));

      // Update your data under the new key
      await set(
        ref(database, `users/${uid}/requests/${newRequestKey}`),
        state.request
      );
    } else {
      console.error('Unable to generate a unique key.');
    }

    const state = store.getState();

    // Set the request data using the generated key
    await set(newRequestRef, state.route);
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

export const uploadDealToFirebase = async (uid, dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/deals`);

    // Generate a new unique key for the request
    const newRequestRef = push(requestsRef);

    // Add the unique key to the the store
    dispatch(setDealId(newRequestRef.key));

    const state = store.getState();
    // Set the request data using the generated key
    await set(newRequestRef, state.deal);
  } catch (error) {
    console.error('Error creating suggestions: ', error, 'user: ', uid);
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
