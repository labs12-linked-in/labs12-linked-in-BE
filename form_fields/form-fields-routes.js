const router = require('express').Router()

const Fields = require('./form-fields-model.js')

// add a form field
router.post('/field', async (req, res) => {
  const { form_id, name, type, selected } = req.body

  if (!form_id) {
    res.status(400).json({ message: 'Please provide form_id.' })
  }
  if (!name) {
    res.status(400).json({ message: 'Please provide name.' })
  }
  if (!type) {
    res.status(400).json({ message: 'Please provide type.' })
  }
  if (!selected) {
    res.status(400).json({ message: 'Please provide selected.' })
  }

  Fields.addField(req.body)
    .then(async field => {
      res.status(200).json(field)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ err: 'Could not add field', error })
    })
})

// get fields by form id
router.get('/field', async (req, res) => {
  const { form_id } = req.body

  if (!form_id) {
    res.status(400).json({ message: 'Please provide form_id.' })
  }

  Fields.getFieldsByForm(form_id)
    .then(async fields => {
      res.status(200).json(fields)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ err: 'Could not retrive fields', error })
    })
})

//delete form
router.delete('/field', (req, res) => {
  const { id } = req.body

  if (!id) {
    res.status(400).json({ message: 'Please provide field id.' })
  }

  Fields.deleteField(id)
    .then(response => {
      res
        .status(200)
        .json({ message: 'field has been banished from this database' })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ err: 'Could not delete field', error })
    })
})

module.exports = router
