exports.seed = function(knex) {
    return knex('forms').insert([
        {user_id: 1, name: 'FE dev',}, // 1
        {user_id: 2, name: 'BE dev',}, // 2
    ]);
  };