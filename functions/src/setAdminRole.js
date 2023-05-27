const admin = require('firebase-admin');
const serviceAccount = require('../portatoapp-firebase-adminsdk-80yy0-bfde2368a4.json');

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
