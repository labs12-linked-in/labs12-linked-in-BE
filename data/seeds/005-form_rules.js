exports.seed = function(knex) {
    return knex('form_rules').insert([
        {
            form_id: 1,
            name: 'Picture',
            operator: 'Exists',
            text_compare: '',
            number_compare: '',
            send_to: 'Data',
        },
        {
            form_id: 2,
            name: 'Headline',
            operator: 'Contains',
            text_compare: 'CEO',
            number_compare: '',
            send_to: 'Engineering',
        },
        {
            form_id: 2,
            name: 'Location',
            operator: 'does not contain',
            text_compare: 'San Francisco',
            number_compare: '',
            send_to: 'Data',
        },
        {
            form_id: 2,
            name: 'Total Endorsements',
            operator: 'is greater than',
            text_compare: '',
            number_compare: 50,
            send_to: 'Data',
        },
    ]);
    };