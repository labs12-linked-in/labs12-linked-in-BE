const passport = require('passport');
const axios = require('axios');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;

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

//Use LinkedInStrategy with passport
passport.use(new LinkedInStrategy({
    clientID: LINKEDIN_API_KEY,
    clientSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:9001/api/auth/linkedin/callback",
    scope: [ 'r_emailaddress', 'r_liteprofile'],
    },
     function(token, refreshToken, profile, done) {
       //User.findOrCreate({ linkedinId: profile.id}, function (err, user) {
        //return done(err, user);
        //})
        console.log(profile);
        console.log('TOKEN', token);
        return done(null, profile);
    }
));