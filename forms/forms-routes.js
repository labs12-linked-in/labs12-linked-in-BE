const router = require('express').Router();

const Forms = require('./forms-models.js');

// add a new form
router.post('/:userId', async (req, res) => {
    if (!req.body.name) {
        res.status(406).json({ message: 'Form name required' })
        return
    }
    try {
        const form = {
            user_id: req.params.userId,
            name: req.body.name
        }
        const newForm = await Forms.newForm(form)
        res.status(201).json(newForm.id)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error creating new form' })
    }
});

// get all forms
router.get('/:userId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try{
            const forms = await Forms.getAllByUserId(req.params.userId)
            await forms.sort((a, b) => b.created_at - a.created_at)
            res.status(200).json(forms)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error retrieving forms' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }
});

// delete a form
router.delete('/:userId/:formId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const count = await Forms.removeForm(req.params.formId)
            if (count > 0) {
                res.status(200).json({ message: 'Form deleted' })
            } else {
                res.status(404).json({ message: 'Form not found' })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error deleting the form' })
        }
    // } else {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }
});

// update a form
router.put('/:userId/:formId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const newForm = {...req.body}
            const form = await Forms.updateForm(
                req.params.formId,
                newForm
            )
            res.status(200).json(form)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error updating form' })
        }
    // } else {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }
});

module.exports = router