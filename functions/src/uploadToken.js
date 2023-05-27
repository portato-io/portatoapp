const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.storeMessagingToken = functions.https.onRequest((req, res) => {
  // check request method
  if (req.method !== 'POST') {
    return res
      .status(400)
      .json({ message: 'Method not allowed. Send a POST request.' });
  }

  // get token from request body
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ message: 'No token provided.' });
  }

  // store the token in the database
  const db = admin.database();
  const ref = db.ref('tokens');

  return ref
    .push(token)
    .then(() => {
      return res.status(200).json({ message: 'Token stored successfully.' });
    })
    .catch((error) => {
      return res.status(500).json({ message: 'Failed to store token.', error });
    });
});
