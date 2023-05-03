import { ref, onValue, get, set, push } from 'firebase/database';
import { database } from './firebaseConfig';

export const uploadReduxStoreToFirebase = async (uid, state) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, `users/${uid}/requests`);

    // Generate a new unique key for the request
    const newRequestRef = push(requestsRef);

    // Set the request data using the generated key
    await set(newRequestRef, state);

    console.log('Request uploaded successfully');
  } catch (error) {
    console.error('Error uploading request:', error);
  }
};

export const fetchDataOnce = async (uid) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/requests`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
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
        console.log('No data found.');
      }
    },
    (error) => {
      console.error('Error fetching data from Firebase:', error);
    }
  );
};
