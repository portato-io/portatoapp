const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const corsModule = require('cors');

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

function sendEmail(req, res) {
  cors(req, res, async () => {
    try {
      const { name, email, message, targetEmail } = req.body;

      const mailOptions = {
        from: '"Notifications" <notifications@portato.io>',
        to: targetEmail,
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

exports.sendEmail = functions.https.onRequest(sendEmail);
