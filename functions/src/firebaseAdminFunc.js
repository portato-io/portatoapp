const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// initialize firebase admin SDK
admin.initializeApp();

const { sender, mailing_service } = functions.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: sender.email_address,
    pass: sender.email_password,
    clientId: mailing_service.client_id,
    clientSecret: mailing_service.client_secret,
    refreshToken: mailing_service.refresh_token,
  },
});

const sendNotification = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Invalid request method' });
      }

      let data = req.body;
      console.log('tokens are :', data.tokens);
      if (!data.tokens) {
        return res.status(400).json({ error: 'Missing tokens' });
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
      };

      let responses = [];
      for (let token of data.tokens) {
        message.token = token;
        try {
          let response = await admin.messaging().send(message);
          responses.push('Successfully sent message: ' + response);
        } catch (error) {
          responses.push(
            'Error sending message to token ' + token + ': ' + error
          );
        }
      }
      return res.status(200).json({ results: responses });
    });
  });

const sendNotificationEmail = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { title, body, uid, email } = req.body;
        let targetEmail;
        if (uid && !admin) {
          targetEmail = await getUserEmail(uid); // Fetch email address from UID
        } else if (!email) {
          res.status(500).send('No uid given');
          return;
        } else {
          targetEmail = email;
        }

        let userInfo = null;
        if (uid && admin) {
          // Making sure that there's a UID to fetch user info.
          userInfo = await getUserInfo(uid);
        }

        // Append userInfo to email body if it exists
        let modifiedBody = body;
        if (userInfo) {
          // Here, you can format userInfo as per your requirements.
          // For the sake of this example, I'm just appending userInfo as a string.
          modifiedBody += `\n\nUser Info: ${JSON.stringify(userInfo)}`;
        }

        const mailOptions = {
          from: '"Notifications" <notifications@portato.io>',
          to: targetEmail,
          subject: title,
          text: modifiedBody.replace(/<[^>]*>?/gm, ''), // Strip HTML tags for the plain text version
          html: modifiedBody, // Also include HTML in your email
        };

        // Continue with the sending email logic

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

async function getUserInfo(uid) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

module.exports = {
  getUserEmail,
  getUserInfo,
  sendNotification,
  sendNotificationEmail,
};
