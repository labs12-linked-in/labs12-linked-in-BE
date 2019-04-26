const router = require('express').Router();

const Forms = require('./forms-models.js');

router.post('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(406).json({ message: 'Form name required' })
        return
    }
    try {
        const form = {
            user_id: req.params.id,
            name: req.body.name
        }
        const newForm = await Forms.newForm(form)
        res.status(201).json(newForm.id)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error creating new form' })
    }
});

module.exports = router