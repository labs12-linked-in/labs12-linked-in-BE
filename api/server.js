const express = require('express')
const bodyParser = require('body-parser')

const configureMiddleware = require('./middleware.js')
const authRouter = require('../authenticate/auth-routes.js')

const server = express()

const users = require('../user/user-routes')

//express middleware to parse req.body before handlers
server.use(bodyParser.json())

const forms = require('../forms/forms-routes.js')
const departments = require('../departments/departments-routes.js')

configureMiddleware(server)

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
})

server.use('/api/users', users)

server.use('/api/auth', authRouter)
server.use('/api/forms', forms)


module.exports = server
