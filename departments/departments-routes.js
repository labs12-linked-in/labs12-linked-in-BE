const router = require('express').Router();

const Departments = require('./departments-models.js');

// add a new department
router.post('/:userId', async (req, res) => {
    if (!req.body.name || !req.body.admin_email) {
        res.status(406).json({ message: 'Form name and admin email required' })
        return
    }
    try {
        console.log("req.body: ", req.body)
        const department = {
            user_id: req.params.userId,
            name: req.body.name,
            admin_email: req.body.admin_email,
            supervisor_email: req.body.supervisor_email,
            manager_email: req.body.manager_email,
            director_email: req.body.director_email,
            vp_email: req.body.vp_email
        }
        const newDepartment = await Departments.newDepartment(department)
        res.status(201).json(newDepartment.id)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error creating new department' })
    }
});

// get all departments
router.get('/:userId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const departments = await Departments.getAllByUserId(req.params.userId)
            await departments.sort((a, b) => b.created_at - a.created_at)
            res.status(200).json(departments)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error retrieving departments' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }
});

// delete a department
router.delete('/:userId/:deptId', async (req, res) => {
// if (req.user_id.toString() === req.params.userId) {
    try {
        const count = await Departments.removeDepartment(req.params.deptId)
        if (count > 0) {
            res.status(200).json({ message: 'Department deleted' })
        } else {
            res.status(404).json({ message: 'Form not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error deleting the department' })
    }
// } else {
    // return res.status(401).json({ message: 'Unauthorized' })
// }
});

// update a department
router.put('/:userId/:deptId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const newDepartment = {...req.body}
            const department = await Departments.updateDepartment(
                req.params.deptId,
                newDepartment
            )
            res.status(200).json(department)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error updating department' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }

});

module.exports = router
