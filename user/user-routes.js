const router = require('express').Router()
const User = require('./user-model')
const bcrypt = require('bcryptjs')
const axios = require('axios')

// // verify if user exists, if so return user if not add user then return user
// router.get('/user', async (req, res) => {
//   try {
//     const users = await Users.find(req.query)
//     res.status(200).json(users)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

// verify if user exists, if so return user if not add user then return user
router.post('/user', async (req, res) => {
  const response = await axios.get('https://api.linkedin.com/v2/me', {
    headers: {
      Authorization: 'Bearer ' + req.body.access_token,
      Connection: 'Keep-Alive'
    }
  })

  const { id } = response.data
  const firstName = response.data.localizedFirstName
  const lastName = response.data.localizedLastName

  console.log(id)
  console.log(firstName)
  console.log(lastName)

  if (!id) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.verifyUser(id)
    .then(async user => {
      const token = User.generateToken()
      if (user == null) {
        const newUser = await User.addUser({
          user_id: id,
          first_name: firstName,
          last_name: lastName
        })
        res.status(200).json({ userInfo: newUser, token: token })
      }
      res.status(200).json({ userInfo: user, token: token })
    })
    .catch(error => {
      res.status(500).json({ err: 'Could not verify user', error })
    })
})

// delete user
router.delete('/banish', (req, res) => {
  const { user_id } = req.body

  if (!user_id) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.deleteUser(user_id)
    .then(response => {
      console.log(res, 'res')
      res
        .status(200)
        .json({ message: 'user has been banished from this database' })
    })
    .catch(error => {
      console.log(error, 'er')
      res.status(500).json({ err: 'Could not delete user', error })
    })
})

// check if user is pro
router.get('/upgrade/:id', async (req, res) => {
  const id = req.params.id

  if (!id) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  const status = await User.getStatus(id)
  console.log(status, 'status')
  let count = await User.getFormCount(id)
  count = parseInt(count.count, 10)

  console.log(count, 'count')

  if (status.pro == false && count >= 3) {
    res.status(200).json({
      message: 'Upgrade account to pro for more forms',
      pro: status.pro,
      form_count: count
    })
  } else {
    res.status(200).json({
      message: 'User can make forms',
      pro: status.pro,
      form_count: count
    })
  }
})

// upgrade user
router.post('/upgrade', (req, res) => {
  const { user_id } = req.body

  if (!user_id) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.upgradeUser(user_id)
    .then(response => {
      console.log(response, 'res')
      res
        .status(200)
        .json({ message: 'user has been upgraded to a pro account!' })
    })
    .catch(error => {
      console.log(error, 'er')
      res.status(500).json({ err: 'Could not upgrade user', error })
    })
})

module.exports = router
