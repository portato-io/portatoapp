import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as corsModule from 'cors';

const cors = corsModule({ origin: true });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { name, email, message } = req.body;

    const mailOptions: MailOptions = {
      from: 'your-email@gmail.com',
      to: 'target-email@example.com',
      subject: 'New Message from React Web App',
      text: `${name} (${email}) says: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(info);
      }
    });
  });
});
