import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { getStorage, ref } from 'firebase/storage';
import { addNotificationsToken } from './linksStoreToFirebase';
import { getAnalytics } from 'firebase/analytics';

const notificationButton = document.getElementById('enableNotifications');
let swRegistration = null;
const TokenElem = document.getElementById('token');
const ErrElem = document.getElementById('err');

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'portatoapp.firebaseapp.com',
  databaseURL:
    'https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'portatoapp',
  storageBucket: 'portatoapp.appspot.com',
  messagingSenderId: '22027928847',
  appId: '1:22027928847:web:3588209ce56727486f2a7a',
  measurementId: 'G-Y4VZJ8CMPY',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Functions
export const functions = getFunctions(app);

// Get a reference to the Realtime Database service
export const database = getDatabase(app);

export const auth = getAuth();

export const storage = getStorage(app);

export const storageRef = ref(storage);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// Get a reference to the analytics service
export const analytics = getAnalytics(app);

export const onMessageListener = (callback) => {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export const fetchToken = (setTokenFound, uid) => {
  return getToken(messaging, {
    vapidKey:
      'BN1R0jA9hh7euhpDZ_AjxNvffl-Tcrlx9t7ijnKg6MJjuMSaEuVf1DNQPe-jINpqinR4Ihv6nXPFwMPxDqFq3vo',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        addNotificationsToken(uid, currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};
