const db = require('../data/dbConfig.js')

module.exports = {
  verifyUser,
  addUser,
  deleteUser
}

async function verifyUser(user) {
  const selected = db('users')
    .where('user_id', user.user_ID)
    .first()

  return selected
}

async function addUser(user) {
  const [id] = await db('users')
    .returning('id')
    .insert(user)
  return db('users')
    .where({ id })
    .first()
}

async function deleteUser(id) {
  return db('users')
    .where('id', id)
    .del()
}
