const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          first_name: 'Matt',
          last_name: 'Rothstein',
          email: 'matt@test.com',
          password: bcrypt.hashSync('password', 4)
        },
      ]);
    });
};
