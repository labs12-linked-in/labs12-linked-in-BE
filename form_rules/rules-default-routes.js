const router = require('express').Router();

const RulesDefault = require('./rules-default-models.js');

// add a new form_rules_default
router.post('/default/:userId/:formId', async (req, res) => {
    console.log(req.body)
    if (!req.body.send_to) {
        res.status(406).json({ message: 'Default delivery must be set' });
        return;
    }
    try {
        const defaultRule = {
            form_id: req.params.formId,
            send_to: req.body.send_to
        }
        const newDefaultRule = await RulesDefault.newDefaultRule(defaultRule);
        res.status(201).json(newDefaultRule.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error saving default delivery rule' })
    }

}) 

module.exports = router