const router = require('express').Router();

const RulesDefault = require('./rules-default-models.js.js');

// add a new form_rules_default
router.post('/:userId/:formId', async (req, res) => {
    console.log(req.body)
    if (!req.body) {

    }
}) 