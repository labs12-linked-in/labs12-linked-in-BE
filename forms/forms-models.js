const db = require('../data/dbConfig.js')

const getByFormId = id => {
  return db('forms')
    .where({ id })
    .first()
}

const newForm = async form => {
  const [id] = await db('forms')
    .insert(form)
    .returning('id')
  return getByFormId(id)
}

const getAllByUserId = id => {
  return db('forms')
    .join('users', 'forms.user_id', 'users.id')
    .where('users.id', id)
    .select(
      'forms.id as form_id',
      'forms.name',
      'forms.field_count',
      'forms.created_at',
      'forms.updated_at',
      'users.id as user_id',
      'users.first_name',
      'users.last_name'
    )
}

const removeForm = id => {
  return db('forms')
    .where({ id })
    .del()
}

const updateForm = async (id, form) => {
  await db('forms')
    .where({ id: form.id })
    .update({ name: form.name })
    .update('updated_at', db.fn.now())
  return db('forms')
    .where({ id })
    .first()
}

async function getStatus(id) {
  return db('users')
    .select('pro')
    .where({ id })
    .first()
}

async function getFormCount(id) {
  return db('forms')
    .count('user_id')
    .where({ user_id: id })
    .first()
}

module.exports = {
  getByFormId,
  newForm,
  getAllByUserId,
  removeForm,
  updateForm,
  getStatus,
  getFormCount
}
