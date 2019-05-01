const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookiesMiddleware = require('universal-cookie-express');

const configureMiddleware = require('./middleware.js');
const authRouter = require('../authenticate/auth-routes.js');
const forms = require('../forms/forms-routes.js')

const server = express();
require('../config/passport');

configureMiddleware(server);

//express middleware to parse req.body before handlers
server.use(bodyParser.json());


server.use(cookiesMiddleware());
server.use(session({ secret: 'turquoise monkey', resave: false, saveUninitialized: true, cookie: { secure: true} }));
// Initializing passport and passport.session() middleware to support persistent login sessions
//server.use(passport.session());
server.use(passport.initialize());


server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
});

server.use('/api/auth', authRouter);
server.use('/api/forms', forms);

module.exports = server
