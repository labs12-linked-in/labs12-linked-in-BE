const jwt = require('jsonwebtoken')
const secret = require('./secret.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token.' })
      } else {
        req.decodedJwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'No token provided. Please log in.' })
  }
}
