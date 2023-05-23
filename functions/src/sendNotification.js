const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// initialize firebase admin SDK
admin.initializeApp();

exports.sendNotification = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors(req, res, () => {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Invalid request method' });
      }

      let data = req.body;
      console.log('token is :', data.token);
      if (!data.token) {
        return res.status(400).json({ error: 'Missing token' });
      }

      var message = {
        data: {
          title: data.title,
          body: data.body,
        },
        notification: {
          title: data.title,
          body: data.body,
        },
        token: data.token,
      };

      return admin
        .messaging()
        .send(message)
        .then((response) => {
          res
            .status(200)
            .json({ result: 'Successfully sent message: ' + response });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Error sending message: ' + error });
        });
    });
  });
