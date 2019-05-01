exports.seed = function(knex) {
    return knex('form_rules_default').insert([
        {form_id: 1, send_to: 'Manager',},
        {form_id: 2, send_to: 'CTO',},
    ]);
};