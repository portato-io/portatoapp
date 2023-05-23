// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyC3X0ZVQIbTvJIpJfDGdrc2q8_JlSVzDT4',
  authDomain: 'portatoapp.firebaseapp.com',
  databaseURL:
    'https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'portatoapp',
  storageBucket: 'portatoapp.appspot.com',
  messagingSenderId: '22027928847',
  appId: '1:22027928847:web:3588209ce56727486f2a7a',
  measurementId: 'G-Y4VZJ8CMPY',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
