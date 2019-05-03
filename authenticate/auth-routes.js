const router = require('express').Router()
const passport = require('passport')

router.get('/', function(req, res) {
  res.render('index', { user: req.user })
})

router.get('/login', function(req, res) {
  res.render('login', { user: req.user })
})

//passport.authenticate() as route middleware to auth. if auth fails, user is redirected back to login. Otherwise primary route function is called
router.get(
  '/login',
  passport.authenticate('linkedin', { state: 'SOMESTATE' }),
  function(req, res) {}
)

router.get('/linkedin/callback', passport.authenticate('linkedin'), function(
  req,
  res
) {
  req.session.user = req.user
  console.log('******* REQ.USER ******* \n', req.user)
  res.redirect(
    `http://localhost:3000/saveuser/?id=${req.user.id}&name=${
      req.user.name.givenName
    }`
  )
})

router.get('/authenticate', function(req, res) {})

//route middleware that checks if user is authenticated
//use on any resource that is restricted.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('login')
}

module.exports = router
