const db = require('../data/dbConfig.js');

const getByRuleId = id => {
    return db('form_rules')
        .where({ id })
        .first()
};

const getAllByRuleId = form_field_id => {
    return db('form_rules')
        .where({ form_field_id })
};

const newRule = async rule => {
    const [id] = await db('form_rules')
        .insert(rule)
        .returning('id')
    return getByRuleId(id)
};

const removeRule = id => {
    return db('form_rules')
        .where({ id })
        .del()
}

module.exports = {
    getByRuleId,
    getAllByRuleId,
    newRule,
    removeRule,
}

