exports.seed = function(knex) {
    return knex('departments').insert([
        {
            user_id: 1, 
            name: 'Engineering',
            admin_email: '1@test.com',
            supervisor_email: '2@test.com',
            manager_email: '3@test.com',
            director_email: '4@test.com',
            vp_email: '5@test.com',
        },
        {
            user_id: 2, 
            name: 'Data',
            admin_email: '6@test.com',
            supervisor_email: '7@test.com',
            manager_email: '9@test.com',
            director_email: '10@test.com',
            vp_email: '11@test.com',
        },
    ]);
};