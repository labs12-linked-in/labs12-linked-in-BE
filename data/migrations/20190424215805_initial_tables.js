
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table
                .string('email')
                .notNullable()
                .unique()
            table.string('password').notNullable()
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())  
        })

        .createTable('forms', table => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.string('name')
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())  
        })

        .createTable('form_fields', table => {
            table.increments()
            table
                .integer('form_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('forms')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.string('name').notNullable()
            table.string('type').notNullable()
            table.string('selected').notNullable()
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())  
        })
        
        .createTable('form_rules_default', table => {
            table.increments()
            table
                .integer('form_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('forms')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.integer('send_to').notNullable()
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())     
        })

        .createTable('form_rules', table => {
            table.increments()
            table
                .integer('form_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('forms')
                .onDelete('CASCADE')
                .onUpdate('CASCADE') 
            table.string('name').notNullable()
            table.string('operator').notNullable()
            table.string('text_compare')
            table.integer('number_compare')
            table.string('send_to').notNullable()
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())  
        })

        .createTable('departments', table => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.string('name').notNullable()
            table.string('admin_email')
            table.string('supervisor_email')
            table.string('manager_email')
            table.string('director_email')
            table.string('vp_email')
            table
                .datetime('created_at')
                .notNullable()
                .defaultTo(knex.fn.now())
            table
                .datetime('updated_at')
                .notNullable()
                .defaultTo(knex.fn.now())  
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('departments')
        .dropTableIfExists('forms')
        .dropTableIfExists('form_fields')
        .dropTableIfExists('form_rules_default')
};
