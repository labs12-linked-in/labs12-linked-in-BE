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

module.exports = {
    
}