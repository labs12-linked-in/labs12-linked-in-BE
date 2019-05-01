const db = require('../data/dbConfig.js');

const getByFormId = id => {
    return db('forms')
        .where({ id })
        .first()
};

const newDefaultRule = async defaultRule => {
    const [id] = await db('form_rules_default')
        .insert(defaultRule)
        .returning('id')
    return getByFormId(id)
}

module.exports = {
    getByFormId,
    newDefaultRule,
}