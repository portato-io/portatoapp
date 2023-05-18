import { ref, onValue, get, set, push } from 'firebase/database';
import { database } from './firebaseConfig';
import { setObjectId } from './Store/actions/requestActionCreators';
import { setRouteId } from './Store/actions/routeActionCreators';
import { setDealId } from './Store/actions/dealActionCreators';
import { useDispatch } from 'react-redux';

export const uploadRequestToFirebase = async (uid, state, dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/requests`);

    // Generate a new unique key for the request
    const newRequestRef = push(requestsRef);

    // Add the unique key to the the store
    dispatch(setObjectId(newRequestRef));

    // Set the request data using the generated key
    await set(newRequestRef, state);

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

export const uploadRouteToFirebase = async (uid, state, dispatch) => {
  try {
    createDirFirebase('route_suggestions', uid);
    createDirFirebase('route_confirmed', uid);

    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/routes`);

    // Generate a new unique key for the request
    const newRequestRef = push(requestsRef);

    // Add the unique key to the the store
    dispatch(setRouteId(newRequestRef));

    // Set the request data using the generated key
    await set(newRequestRef, state);
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

export const uploadDealToFirebase = async (uid, state, dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/deals`);

    // Generate a new unique key for the request
    const newRequestRef = push(requestsRef);

    // Add the unique key to the the store
    dispatch(setDealId(newRequestRef));

    // Set the request data using the generated key
    await set(newRequestRef, state);
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
