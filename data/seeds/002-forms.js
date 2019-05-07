exports.seed = function(knex) {
  return knex("forms").insert([
    { user_id: 1, name: "FE dev", field_count: 0 }, // 1
    { user_id: 2, name: "BE dev", field_count: 0 } // 2
  ]);
};
