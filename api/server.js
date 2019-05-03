const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');

const configureMiddleware = require('./middleware.js');
const authRouter = require('../authenticate/auth-routes.js');
const forms = require('../forms/forms-routes.js');
const users = require('../user/user-routes.js');
const departments = require('../departments/departments-routes.js');
const defaultRules = require('../form_rules/rules-default-routes.js');
const rules = require('../form_rules/rules-routes.js');
const fields = require('../form_fields/form-fields-routes')

const server = express();
require('../config/passport');

configureMiddleware(server);

//express middleware to parse req.body before handlers
server.use(bodyParser.json());


// // Initializing passport and passport.session() middleware to support persistent login sessions
// server.use(passport.initialize());
// server.use(passport.session());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["cookie"]
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling') 
});

server.use('/api/users', users)
server.use('/api/auth', authRouter)
server.use('/api/forms', forms)
server.use('/api/fields', fields)
server.use('/api/departments', departments)
server.use('/api/rules', defaultRules, rules)


module.exports = server
