exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table
        .string('user_id')
        .notNullable()
        .unique()
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
      table.integer('field_count').defaultTo(0)
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
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .raw(
      ' CREATE OR REPLACE FUNCTION add_one() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN UPDATE forms SET field_count = field_count + 1 WHERE id = NEW.form_id; RETURN NEW; END; $$; CREATE TRIGGER add AFTER INSERT ON form_fields FOR EACH ROW EXECUTE FUNCTION add_one();'
    )
    .raw(
      ' CREATE OR REPLACE FUNCTION subtract_one() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN UPDATE forms SET field_count = field_count - 1 WHERE id = OLD.form_id; RETURN NEW; END;  $$; CREATE TRIGGER subtract AFTER DELETE ON form_fields FOR EACH ROW EXECUTE FUNCTION subtract_one();'
    )

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

    .createTable('form_rules', table => {
      table.increments()
      table
        .integer('form_field_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('form_fields')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
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
      table.string('admin_email').notNullable()
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
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('form_rules')
    .dropTableIfExists('departments')
    .dropTableIfExists('form_rules_default')
    .dropTableIfExists('form_fields')
    .dropTableIfExists('forms')
    .dropTableIfExists('users')
}
