const db = require('../data/dbConfig.js')
const jwt = require('jsonwebtoken')
const secret = require('../auth/secret.js')

module.exports = {
  find,
  verifyUser,
  addUser,
  deleteUser,
  generateToken,
  upgradeUser,
  getStatus,
  getFormCount
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

async function upgradeUser(user_id) {
  await db('users')
    .update({ pro: true })
    .where({ user_id })

  return db('users')
    .where({ user_id })
    .first()
}

async function getStatus(id) {
  return db('users')
    .select('pro')
    .where({ id })
    .first()
}

async function getFormCount(id) {
  return db('forms')
    .count('user_id')
    .where({ user_id: id })
    .first()
}
