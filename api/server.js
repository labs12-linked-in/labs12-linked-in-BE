const express = require('express')
const bodyParser = require('body-parser')

const configureMiddleware = require('./middleware.js')
const authRouter = require('../authenticate/auth-routes.js')

const server = express()
const fields = require('../form_fields/form-fields-routes')
const users = require('../user/user-routes')

//express middleware to parse req.body before handlers
server.use(bodyParser.json())

const forms = require('../forms/forms-routes.js')

configureMiddleware(server)

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
})

server.use('/api/users', users)

server.use('/api/auth', authRouter)
server.use('/api/forms', forms)
server.use('/api/fields', fields)

module.exports = server
