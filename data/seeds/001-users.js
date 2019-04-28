const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
        first_name: 'Matt',
        last_name: 'Rothstein',
        email: 'matt@test.com',
        password: bcrypt.hashSync('matt', 4),
    }, // 1
    {
        first_name: 'Brandon',
        last_name: 'Borrero',
        email: 'brandon@test.com',
        password: bcrypt.hashSync('brandon', 4),
    }, // 2
  ]);
};