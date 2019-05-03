const passport = require('passport');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;
//const GoogleStrategy = require('passport-google-oauth2').Strategy;

//passport session setup.
//this will store the user ID when serializing and finding the user ID when deserializing
passport.serializeUser(function(user, done) {
    done(null, user);
  })

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  })


const LINKEDIN_API_KEY = "771ecovrndfj2c";
const LINKEDIN_SECRET_KEY = "6o8jPyhTMVu0QbxR";
//const GOOGLE_CLIENT_ID = "517361541331-k0pajmblo148otk8e8dju4j01sfoeqil.apps.googleusercontent.com";
//const GOOGLE_CLIENT_SECRET = "JqgkjnV3HQkboeMlcw4JP-xl";

//Use LinkedInStrategy with passport
passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_API_KEY,
    clientSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "https://linkedinextension.herokuapp.com/api/auth/linkedin/callback",
    scope: [ 'r_emailaddress', 'r_liteprofile'],
    passReqToCallback: true
    },
     function(req, accessToken, refreshToken, profile, done) {
       //req.session.accessToken = accessToken;
       //req.session.user = profile;
       process.nextTick(function () {
       //User.findOrCreate({ linkedinId: profile.id}, function (err, user) {
        //return done(err, user);
        //})
        console.log(profile);
        console.log('TOKEN', accessToken);
        return done(null, profile);
      });
    }
));

//Use Google Strategy with passport
/*passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:9001/api/auth/google/callback",
  passReqToCallback: true
},
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id}, function (err, user) {
      return done(err, user);
    })
  },
  function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
))*/