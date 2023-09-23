const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const { sender, mailing_service } = functions.config();
const TRANSPORT_OPTIONS = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: sender.email_address,
    pass: sender.email_password,
    clientId: mailing_service.client_id,
    clientSecret: mailing_service.client_secret,
    refreshToken: mailing_service.refresh_token,
  },
};

const transporter = nodemailer.createTransport(TRANSPORT_OPTIONS);

const sendNotification = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Invalid request method' });
      }

      const data = req.body;
      console.log('tokens are:', data.tokens);
      if (!data.tokens) {
        return res.status(400).json({ error: 'Missing tokens' });
      }

      const message = {
        data: {
          title: data.title,
          body: data.body,
        },
        notification: {
          title: data.title,
          body: data.body,
        },
      };

      const responses = [];
      for (let token of data.tokens) {
        message.token = token;
        try {
          let response = await admin.messaging().send(message);
          responses.push(`Successfully sent message: ${response}`);
        } catch (error) {
          responses.push(`Error sending message to token ${token}: ${error}`);
        }
      }

      return res.status(200).json({ results: responses });
    });
  });

const sendNotificationEmail = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
      try {
        const { title, body, uid, email, admin, greetings } = req.body;

        let targetEmail;
        if (uid && !admin) {
          targetEmail = await getUserData(uid, 'email');
          if (!targetEmail) {
            return res
              .status(500)
              .json({ error: 'Could not retrieve email for the given UID' });
          }
          console.log(`Sending email to UID: ${targetEmail}`);
        } else if (email) {
          targetEmail = email;
          console.log(`Sending email to: ${targetEmail}`);
        } else {
          return res.status(500).json({ error: 'No uid or email given' });
        }

        let userInfo = uid && admin ? await getUserData(uid) : null;

        let displayName = '';
        if (uid) {
          displayName = (await getUserData(uid, 'displayName')) || '';
        }

        const greeting = displayName
          ? greetings + ` ${displayName},<br><br>`
          : '';
        const modifiedBody =
          greeting +
          (userInfo
            ? `${body}\n\nUser Info: ${JSON.stringify(userInfo)}`
            : body);

        const mailOptions = {
          from: '"Portato" <notifications@portato.io>',
          to: targetEmail,
          subject: title,
          text: modifiedBody.replace(/<[^>]*>?/gm, ''),
          html: modifiedBody,
        };

        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);

        return res.status(200).json(info);
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: error.message });
      }
    });
  });

async function getUserData(uid, field) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    console.log(`${field} for ${uid}: ${userRecord[field]}`);
    return field ? userRecord[field] : userRecord;
  } catch (error) {
    console.error(`Error fetching user data for UID ${uid}:`, error);
    return null;
  }
}

module.exports = {
  getUserData,
  sendNotification,
  sendNotificationEmail,
};
