const sendNotification = require('./sendNotification');
const emailSender = require('./emailSender');
const fetchOpenRouteModule = require('./fetchOpenRoute');

require('dotenv').config();

exports.sendNotification = sendNotification.sendNotification;
exports.sendEmail = emailSender.sendEmail;
exports.fetchOpenRoute = fetchOpenRouteModule.fetchOpenRoute;
