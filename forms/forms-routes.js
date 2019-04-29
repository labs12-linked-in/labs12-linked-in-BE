const router = require('express').Router();

const Forms = require('./forms-models.js');

// add a new form
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

// get all forms
router.get('/:id', async (req, res) => {
    // console.log('req: ', req.user_id)
    // if (req.user_id.toString() === req.params.id) {
        try{
            const forms = await Forms.getAllByUserId(req.params.id)
            await forms.sort((a, b) => b.created_at - a.created_at)
            res.status(200).json(forms)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error retrieving forms' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }
})

// delete a form
router.delete('/:id/:formId', async (req, res) => {
    if (req.user_id.toString() === req.params.id) {
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
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
});

module.exports = router