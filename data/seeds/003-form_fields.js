exports.seed = function(knex) {
    return knex('form_fields').insert([
        {
            form_id: 1,
            name: 'Picture',
            type: 'image',
            selected: '.pv-top-card-section__photo'
        },
        {
            form_id: 1,
            name: 'Name',
            type: 'text',
            selected: '.pv-top-card-section__name',
        },
        {
            form_id: 2,
            name: 'Headline',
            type: 'text',
            selected: '.pv-top-card-section__headline',
        },
        {
            form_id: 2,
            name: 'Location',
            type: 'text',
            selected: '.pv-top-card-section__location',
        },
        {
            form_id: 2,
            name: 'Total Endorsements',
            type: 'number',
            selected: '.pv-skill-category-entity__endorsement-count',
        },
    ]);
    };