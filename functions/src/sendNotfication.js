const admin = require('firebase-admin');

// You must pass your server's service account details to initializeApp.
// You can download your service account details from the Firebase Console.
var serviceAccount = require('../portatoapp-firebase-adminsdk-80yy0-bfde2368a4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://portatoapp-default-rtdb.europe-west1.firebasedatabase.app', // replace this with your Realtime Database URL
});

// Function to send push notification
export const sendNotification = (title, body, token) => {
  var message = {
    data: {
      title: title,
      body: body,
    },
    token: token,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};

// Usage
sendNotification('Hello World!', 'This is a test notification.');
