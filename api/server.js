const express = require('express')
const configureMiddleware = require('./middleware.js')
const forms = require('../forms/forms-routes.js')
const users = require('../user/user-routes.js')
const departments = require('../departments/departments-routes.js')
const defaultRules = require('../form_rules/rules-default-routes.js')
const rules = require('../form_rules/rules-routes.js')
const fields = require('../form_fields/form-fields-routes')
const restricted = require('../auth/restrictedMiddleware.js')

const server = express()

configureMiddleware(server)

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
})

server.use('/api/users', users)
server.use('/api/forms', restricted, forms)
server.use('/api/fields', restricted, fields)
server.use('/api/departments', restricted, departments)
server.use('/api/rules', restricted, defaultRules, rules)

module.exports = server
