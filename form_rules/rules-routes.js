const router = require('express').Router();

const Rules = require('./rules-models.js');

// add a new rule
router.post('/fields/:userId/:fieldId', async (req, res) => {
    const { operator, text_compare, number_compare, send_to } = req.body;
    if (!operator || (operator !== "Exists" && operator !== "Does not exist" && (!text_compare && !number_compare)) || !send_to) {
        res.status(406).json({ message: 'All rule fields are required' })
        return;
    }
    try {
        const rule = {
            form_field_id: req.params.fieldId,
            operator: operator,
            text_compare: text_compare,
            number_compare: number_compare,
            send_to: send_to
        }
        const newRule = await Rules.newRule(rule);
        res.status(201).json(newRule.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error saving delivery rule' });
    }
});

// get rules
router.get('/fields/:userId/:fieldId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const rules = await Rules.getAllByRuleId(req.params.fieldId);
            await rules.sort((a, b) => b.created_at - a.created_at);
            res.status(200).json(rules)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error retrieving rule' });
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }
});

// delete a rule
router.delete('/fields/:userId/:fieldId/:ruleId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const count = await Rules.removeRule(req.params.ruleId);
            if (count > 0) {
                res.status(200).json({ message: 'Rule deleted' })
            } else {
                res.status(404).json({ message: 'Rule not found' })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error deleting rule' })
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }    
});

// update a rule
router.put('/fields/:userId/:fieldId/:ruleId', async (req, res) => {
    // if (req.user_id.toString() === req.params.userId) {
        try {
            const newRule = {...req.body};
            const rule = await Rules.updateRule(
                req.params.ruleId,
                newRule
            );
            res.status(200).json(rule);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error updating rule' });
        }
    // } else {
        // return res.status(401).json({ message: 'Unauthorized' })
    // }    
});

module.exports = router;