const router = require('express').Router();

const RulesDefault = require('./rules-default-models.js');

// add a new form_rules_default
router.post('/default/:userId/:formId', async (req, res) => {
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

});

// get form_rules_default
router.get('/default/:userId/:formId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const defaultRule = await RulesDefault.getByFormId(req.params.formId)
            res.status(200).json(defaultRule)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error retrieving default delivery rule' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }
});

// update for_rules_default
router.put('/default/:userId/:formId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const newDefaultRule = {...req.body};
            const defaultRule = await RulesDefault.updateDefaultRule(
                req.params.formId,
                newDefaultRule
            );
            res.status(200).json(defaultRule);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error updating form' });
        }
    // } else {
    //     return res.status(401).json({message: 'Unautohrized'  });
    // }
});

module.exports = router