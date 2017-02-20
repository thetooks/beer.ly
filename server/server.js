/* eslint no-console: 0 */
const express = require('express');
// const https = require('https');
const mongoose = require('mongoose');
// const path = require('path');

const app = express();

// const ssl = require('./middleware/ssl.js');
const config = require('./config/config');
const api = require('./api/api');
const auth = require('./auth/auth');

// mongoose.connect(config.database.local);

// Connect to database THROUGH HIROKU
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect('mongodb://thetooks:hrsf52@ds147069.mlab.com:47069/beerly', options);


// Middleware
require('./middleware/middleware')(app);

// API Routing
app.use('/api', api);

// Authentication
app.use('/auth', auth);

require('./middleware/webpack')(app, express);

// https.createServer(ssl, app).listen(config.port);

app.listen(config.port);
console.log('listening on http://localhost:' + config.port);
// console.info('==> 🍺  flowing on %ss. Open up https://localhost:%s/ in your browser.', config.port, config.port);
