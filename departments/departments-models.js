const db = require('../data/dbConfig.js');

const getByDepartmentId = id => {
    return db('departments')
        .where({ id })
        .first()
};

const newDepartment = async department => {
    const [id] = await db('departments')
        .insert(department)
        .returning('id')
    return getByDepartmentId(id)
};

module.exports = {
    getByDepartmentId,
    newDepartment,
}