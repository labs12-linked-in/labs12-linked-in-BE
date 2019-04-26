const express = require('express');

const configureMiddleware = require('./middleware.js');

const server = express();

const forms = require('../forms/forms-routes.js')

configureMiddleware(server);

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
});

server.use('/api/forms', forms);

module.exports = server
