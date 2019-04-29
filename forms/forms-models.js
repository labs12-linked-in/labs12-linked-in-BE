const db = require('../data/dbConfig.js');

const getByFormId = id => {
    return db('forms')
        .where({ id })
        .first()
};

const newForm = async form => {
    const [id] = await db('forms')
        .insert(form)
        .returning('id')
    return getByFormId(id)
};

const getAllByUserId = id => {
    return db('forms')
        .join('users', 'forms.user_id', 'users.id')
        .where('users.id', id)
        .select(
            'forms.id as form_id',
            'forms.name',
            'forms.created_at',
            'forms.updated_at',
            'users.id as user_id',
            'users.first_name',
            'users.last_name',
            'users.email',
        )
};

const removeForm = id => {
    return db('forms')
        .where({ id })
        .del()
};

module.exports = {
    getByFormId,
    newForm,
    getAllByUserId,
    removeForm,
}