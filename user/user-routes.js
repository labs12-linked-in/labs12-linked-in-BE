const router = require('express').Router()
const User = require('./user-model')
const bcrypt = require('bcryptjs')

//verify if user exists, if so return user if not add user then return user

router.post('/user', async (req, res) => {
  const { user_ID } = req.body

  if (!user_ID) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.verifyUser(req.body)
    .then(async user => {
      if (user == null) {
        const newUser = await User.addUser(req.body)
        res.status(200).json(newUser)
      }
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ err: 'Could not verify user', error })
    })
})

//delete user

router.post('/banish', (req, res) => {
  const { user_ID } = req.body

  if (!user_ID) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.deleteUser(user_ID)
    .then(res => {
      res
        .status(200)
        .json({ message: 'user has been banished from this database' })
    })
    .catch(error => {
      res.status(500).json({ err: 'Could not delete user', error })
    })
})

module.exports = router
