const router = require('express').Router();

const Departments = require('./departments-models.js');

// add a new department
router.post('/:userId', async (req, res) => {
    if (!req.body.name) {
        res.status(406).json({ message: 'Form name required' })
        return
    }
    try {
        const department = {
            user_id: req.params.user_id,
            name: req.body.name,
            admin_email: req.body.admin,
            supervisor_email: req.body.supervisor,
            manager_email: req.body.manager,
            director_email: req.body.director,
            vp_email: req.body.vp
        }
        const newDepartment = await Departments.newDepartment(department)
        res.status(201).json(newDepartment.id)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error creating new department' })
    }
});
