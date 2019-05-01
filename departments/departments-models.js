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

const getAllByUserId = id => {
    return db('departments')
        .join('users', 'departments.user_id', 'users.id')
        .where('users.id', id)
        .select(
            'departments.id as department_id',
            'departments.name',
            'departments.admin_email',
            'departments.supervisor_email',
            'departments.manager_email',
            'departments.director_email',
            'departments.vp_email',
            'departments.created_at',
            'departments.updated_at',
            'users.id as user_id',
            'users.first_name',
            'users.last_name',
        )
};

const removeDepartment = id => {
    return db('departments')
        .where({ id })
        .del()
};

const updateDepartment = async (id, department) => {
    await db('departments')
        .where({ id })
        .update(department)
        .update('updated_at', db.fn.now())
    return db('departments')
        .where({ id })
        .first()
}

module.exports = {
    getByDepartmentId,
    newDepartment,
    getAllByUserId,
    removeDepartment,
    updateDepartment,
}