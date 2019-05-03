const db = require('../data/dbConfig.js')

module.exports = {
  addField,
  deleteField,
  getFieldsByForm,
  updateField
}

async function addField(field) {
  const [id] = await db('form_fields')
    .returning('id')
    .insert(field)
  return db('form_fields').where({ id })
}

async function updateField(field) {
  const [id] = await db('form_fields')
    .returning('id')
    .update(field)
  return db('form_fields').where({ id })
}

async function getFieldsByForm(id) {
  const selected = db('form_fields').where('form_id', id)
  return selected
}

async function deleteField(id) {
  return db('form_fields')
    .where('id', id)
    .del()
}
