const db = require('../data/dbConfig.js');

const getByFormId = id => {
    return db('form_rules_default')
        .where({ id })
        .first()
};

const newDefaultRule = async defaultRule => {
    const [id] = await db('form_rules_default')
        .insert(defaultRule)
        .returning('id')
    return getByFormId(id)
}

const updateDefaultRule = async (id, defaultRule) => {
    await db ('form_rules_default')
        .where({ id })
        .update(defaultRule)
        .update('updated_at', db.fn.now())
    return db('form_rules_default')
        .where({ id })
        .first()
};

module.exports = {
    getByFormId,
    newDefaultRule,
    updateDefaultRule,
};