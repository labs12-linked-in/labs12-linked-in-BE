const express = require('express')

const configureMiddleware = require('./middleware.js')

const server = express()

configureMiddleware(server)

server.get('/', (req, res) => {
  res.status(200).send('Hello Earthling')
})

module.exports = server
