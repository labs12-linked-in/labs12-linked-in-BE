const router = require('express').Router();
const User = require('./user-model');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// verify if user exists, if so return user if not add user then return user
router.get('/user', async (req,res) => {
  try {
    const users = await Users.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/user', async (req, res) => {
  // console.log("\n ********* ACCESS_TOKEN ********* \n", req.body.result.access_token)
  const response = await axios
    .get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: 'Bearer ' + req.body.result.access_token,
        Connection: 'Keep-Alive'
      }
    })
    // console.log(response);
    // console.log(response.data.id);
    // res.status(200).json(response);

  // console.log(response.data.localizedLastName)
  const { id } = response.data
  const firstName = response.data.localizedFirstName
  const lastName = response.data.localizedLastName

  console.log(id)
  console.log(firstName)
  console.log(lastName)


  if (!id) {
    res.status(400).json({ message: 'Please provide user id.' })
  }

  User.verifyUser('wpmRPZ3gcX')
    .then(async user => {
      // console.log("THIS ONE", user)
      if (user == null) {
        const newUser = await User.addUser({ user_id: 'wpmRPZ3gcX', first_name: 'sdsk', last_name: 'ldnk'})
        res.status(200).json(newUser)
      }
      res.status(200).json(user)
      // console.log("KSJBSJKB", user)
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

// get user data from linkedin
// router.post('/data', async (req, res) => {
//   console.log("\n ********* ACCESS_TOKEN ********* \n", req.body.result.access_token)
//   const response = await axios
//     .get('https://api.linkedin.com/v2/me', {
//       headers: {
//         Authorization: 'Bearer ' + req.body.result.access_token
//       }
//     })
//     console.log(response);
//     res.status(200).json(response);
// });

module.exports = router
