const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// initialize firebase admin SDK
admin.initializeApp();

const sendNotification = functions
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

const sendNotificationEmail = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { name, email, message, uid } = req.body;
        let targetEmail;
        if (uid) {
          targetEmail = await getUserEmail(uid); // Fetch email address from UID
        } else {
          res.status(500).send('No uid given');
          return;
        }

        const mailOptions = {
          from: '"Notifications" <notifications@portato.io>',
          to: targetEmail, // Use the fetched email address
          subject: 'New potential delivery solution',
          text: `${name} (${email}) says: ${message}`,
        };

        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);

        res.status(200).send(info);
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send(error);
      }
    });
  });

async function getUserEmail(uid) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.email;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

module.exports = {
  getUserEmail,
  sendNotification,
  sendNotificationEmail,
};
