const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {colName: ''},
        {colName: ''},
        {colName: ''}
      ]);
    });
};
