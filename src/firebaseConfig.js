import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

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

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
//initializeNotificationApp();

function initializeNotificationApp() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    initializeUi();
    initializeFCM();

    //Register the service worker
    navigator.serviceWorker
      .register('/sw.js')
      .then((swReg) => {
        console.log('Service Worker is registered', swReg);
        swRegistration = swReg;
      })
      .catch((error) => {
        console.error('Service Worker Error', error);
      });
    navigator.serviceWorker.ready.then(function (registration) {
      console.log('A service worker is active:', registration.active);

      // At this point, you can call methods that require an active
      // service worker, like registration.pushManager.subscribe()
    });
  } else {
    console.warn('Push messaging is not supported');
    notificationButton.textContent = 'Push Not Supported';
  }
}

function initializeUi() {
  notificationButton.addEventListener('click', () => {
    displayNotification();
  });
}

function initializeFCM() {
  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.');

      // get the token in the form of promise
      return messaging.getToken();
    })
    .then((token) => {
      TokenElem.innerHTML = 'token is : ' + token;
    })
    .catch((err) => {
      ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
      console.log('Unable to get permission to notify.', err);
    });
}

function displayNotification() {
  if (window.Notification && Notification.permission === 'granted') {
    notification();
  }
  // If the user hasn't told if he wants to be notified or not
  // Note: because of Chrome, we are not sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.
  else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission((status) => {
      if (status === 'granted') {
        notification();
      } else {
        alert('You denied or dismissed permissions to notifications.');
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      'You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.'
    );
  }
}

function notification() {
  const options = {
    body: 'Testing Our Notification',
    //icon: './bell.png'
  };
  swRegistration.showNotification('PWA Notification!', options);
}
