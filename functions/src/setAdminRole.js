const admin = require('firebase-admin');
const serviceAccount = require('../portatodev-firebase-adminsdk-qaydx-82b9ae166a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = 'hugobirch@hotmail.fr';

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log('Admin claim set for user', email);
    process.exit();
  })
  .catch((error) => {
    console.error('Error setting admin claim:', error);
    process.exit(1);
  });
