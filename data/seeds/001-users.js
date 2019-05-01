const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      first_name: 'Matt',
      last_name: 'Rothstein',
      user_id: '1'
      // password: bcrypt.hashSync('matt', 4),
    }, // 1
    {
      first_name: 'Brandon',
      last_name: 'Borrero',
      user_id: '2'
      // password: bcrypt.hashSync('brandon', 4),
    } // 2
  ])
}
