const db = require('../data/dbConfig.js')

module.exports = {
  find,
  verifyUser,
  addUser,
  deleteUser
}

function find() {
  return db('users');
};

async function verifyUser(id) {
  console.log("ID", id);
  
  const selected = db('users')
    .where('user_id', id)
    .first()

  return selected
};

async function addUser(user) {
  console.log("USER", user);
  const [id] = await db('users')
    .returning('id')
    .insert(user)
  return db('users')
    .where({ id })
    .first()
};

async function deleteUser(id) {
  const deleted = db('users')
    .where('id', id)
    .del()
  console.log(deleted, 'hi')

  return deleted
};

