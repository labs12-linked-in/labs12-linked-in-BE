// Had to use the below instead of knex-cleaner because it wouldn't reset users ID PK when seeding 
exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE departments, form_rules, form_rules_default, form_fields, forms, users RESTART IDENTITY;"
  );
};