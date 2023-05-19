const sendNotification = require('./sendNotification');
const fetchOpenRouteModule = require('./fetchOpenRoute');

require('dotenv').config();

exports.sendNotification = sendNotification.sendNotification;
exports.fetchOpenRoute = fetchOpenRouteModule.fetchOpenRoute;
