const emailSender = require('./emailSender');
const fetchOpenRouteModule = require('./fetchOpenRoute');

require('dotenv').config();

exports.sendEmail = emailSender.sendEmail;
exports.fetchOpenRoute = fetchOpenRouteModule.fetchOpenRoute;
