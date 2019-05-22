const db = require('../data/dbConfig.js')
const jwt = require('jsonwebtoken')
const secret = require('../auth/secret.js')

module.exports = {
  find,
  verifyUser,
  addUser,
  deleteUser,
  generateToken,
  upgradeUser
}

function generateToken() {
  const payload = {
    message: 'Onward!'
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret.jwtSecret, options)
}

function find() {
  return db('users')
}

async function verifyUser(id) {
  console.log('ID', id)

  const selected = db('users')
    .where('user_id', id)
    .first()

  return selected
}

async function addUser(user) {
  console.log('USER', user)
  const [id] = await db('users')
    .returning('id')
    .insert(user)
  return db('users')
    .where({ id })
    .first()
}

async function deleteUser(id) {
  const deleted = db('users')
    .where('id', id)
    .del()
  console.log(deleted, 'hi')

  return deleted
}

async function upgradeUser(id) {
  const [id] = db('users')
    .where('user_id', id)
    .update('pro', true)
    .returning('id')

  return db('users')
    .where({ id })
    .first()
}
