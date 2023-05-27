const sendNotification = require('./firebaseAdminFunc');
const emailSender = require('./emailSender');
const fetchOpenRouteModule = require('./fetchOpenRoute');

require('dotenv').config();

exports.sendNotification = sendNotification.sendNotification;
exports.sendEmailToUid = emailSender.sendEmailToUid;
exports.sendEmailToSupport = emailSender.sendEmailToSupport;
exports.fetchOpenRoute = fetchOpenRouteModule.fetchOpenRoute;
