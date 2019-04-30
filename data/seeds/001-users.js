const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      first_name: 'Matt',
      last_name: 'Rothstein',
      password: bcrypt.hashSync('matt', 4)
    }, // 1
    {
      first_name: 'Brandon',
      last_name: 'Borrero',
      password: bcrypt.hashSync('brandon', 4)
    } // 2
  ])
}
