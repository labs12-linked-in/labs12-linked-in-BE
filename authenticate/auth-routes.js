const router = require('express').Router()
const passport = require('passport')

/*router.get('/', function(req, res) {
  res.render('index', { user: req.user })
})

router.get('/login', function(req, res) {
  res.render('login', { user: req.user })
})
*/
//passport.authenticate() as route middleware to auth. if auth fails, user is redirected back to login. Otherwise primary route function is called
router.get(
  '/login',
  passport.authenticate('linkedin', { state: 'SOMESTATE' }),
  function(req, res) {}
)

/*router.get('/login',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'] } 
))*/

router.get('/linkedin/callback', passport.authenticate('linkedin'), function(
  req,
  res
) {
  req.session.user = req.user
  console.log('******* REQ.USER ******* \n', req.user)
  res.redirect(
    `https://elated-swirles-c971ca.netlify.com/forms/?id=${req.user.id}&name=${
      req.user.name.givenName
    }`
  )
})

/*router.get('/google/callback',
  passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
})*/

/*router.get('/profile', isUserAuthenticated, (req, res) => {
  res.send("You have reached your profile");
})*/

router.get('/authenticate', function(req, res) {
  res.render('profile', { user: req.user })
})

//route middleware that checks if user is authenticated
//use on any resource that is restricted.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('login')
}

/*function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send('You must login');
  }
}*/

module.exports = router
