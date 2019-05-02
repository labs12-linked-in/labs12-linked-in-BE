const router = require('express').Router();
const passport = require('passport');



router.get('/', function(req, res) {
    res.render('index', { user: req.user })
})

//router.get('/login', function(req,res) {
  //  res.render('login', { user: req.user })
//});

//passport.authenticate() as route middleware to auth. if auth fails, user is redirected back to login. Otherwise primary route function is called
router.get('/login',
    passport.authenticate('linkedin', { state: 'SOMESTATE'}),
    function(req, res) {});

router.get('/linkedin/callback',
    passport.authenticate('linkedin'),
    function(req, res) {
        res.redirect('http://localhost:3000');
    });


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
})

router.get('/authenticate',
    function(req, res) {
        const user = req.user
        res.status(200).json(user)
    }
)


//route middleware that checks if user is authenticated
//use on any resource that is restricted.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('login');
}


module.exports = router;