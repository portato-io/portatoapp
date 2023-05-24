const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const corsModule = require('cors');
const { getUserEmail } = require('./firebaseAdminFunc'); // make sure to point to the correct path of the firebaseAdminFunc.js file

const cors = corsModule({ origin: true });

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

function sendEmailToUid(req, res) {
  cors(req, res, async () => {
    try {
      const { name, email, message, uid } = req.body;
      let targetEmail;
      if (uid) {
        targetEmail = await getUserEmail(uid); // Fetch email address from UID
      } else {
        res.status(500).send('No uid given');
      }

      const mailOptions = {
        from: 'hugo@portato.io',
        to: targetEmail, // Use the fetched email address
        subject: 'New Message from React Web App',
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
}

exports.sendEmailToUid = functions.https.onRequest(sendEmailToUid);

function sendEmailToSupport(req, res) {
  cors(req, res, async () => {
    try {
      const { name, email, message, uid } = req.body;
      let targetEmail;
      if (uid) {
        targetEmail = await getUserEmail(uid); // Fetch email address from UID
      } else {
        res.status(500).send('No uid given');
      }

      const mailOptions = {
        from: 'hugo@portato.io',
        to: targetEmail, // Use the fetched email address
        subject: 'New Message from React Web App',
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
}

exports.sendEmailToSupport = functions.https.onRequest(sendEmailToSupport);
