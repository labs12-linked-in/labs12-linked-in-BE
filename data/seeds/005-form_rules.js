exports.seed = function(knex) {
    return knex('form_rules').insert([
        {
            form_field_id: 1,
            operator: 'Exists',
            send_to: 'Data',
        },
        {
            form_field_id: 2,
            operator: 'Contains',
            text_compare: 'CEO',
            send_to: 'Engineering',
        },
        {
            form_field_id: 2,
            operator: 'does not contain',
            text_compare: 'San Francisco',
            send_to: 'Data',
        },
        {
            form_field_id: 2,
            operator: 'is greater than',
            number_compare: 50,
            send_to: 'Data',
        },
    ]);
    };