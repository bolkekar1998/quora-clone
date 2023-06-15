const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user')

passport.use(new googleStrategy({
    // pass on options
    clientID: "154881120247-8op31q61f551371e4pvndibsruga3jtg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:1000/users/auth/google/callback",
},

// Call back function, if access token expires refresh to get a new access token without asking user to login
function(accessToken, refreshToken, profile, done) {
    User.findOne({
        // we are going to mtach user in the DB
        // google can have multiple emails in arrays
        email: profile.emails[0].value
    }).exec(function(err, user) {
        if (err) {
            console.log('error in google strategy passport', err);
            return;
        }
        console.log(profile);
        // if user found then done, no error
        if (user) {
            // if found sign in that user/req.user
            return done(null, user);
        }else{
            // create user
            User.create({
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
            function(err, user) {
                if (err) {
                    console.log('error in creating user', err);
                    return;
                }
                return done(null, user);
            }
            )
        }
    })
}
));

module.exports = passport;