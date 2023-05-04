import { sendEmail } from './emailSender';
import { fetchOpenRoute } from './fetchOpenRoute';

require('dotenv').config();

exports.sendEmail = sendEmail;
exports.fetchOpenRoute = fetchOpenRoute;
