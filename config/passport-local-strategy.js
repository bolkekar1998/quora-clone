const passport = require('passport');
// we need to require local, with strategy property, we need to use first capital letter.
const LocalStrategy = require('passport-local').Strategy;
// import user schema
const User = require('../models/user');


// authentication using passport, we need to tell passport to use this LocalStrategy thst we created
passport.use(new LocalStrategy({
    // how do we detect which is the user, through email
        usernameField: 'email',
        passReqToCallback: true
    },
    // call back function
    function(req, email, password, done){
        // find a user and establish the identity
        // the first email will be of schema email & value the email which is passed on
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding ----> Passport')
                // done takes err as arguement, this will report an error to passport
                return done(err);
            }
            // if user is not found or if user password is not equal to password entered
            if (!user || user.password != password){
                console.log('Invalid Password')
                // it will take 2 arguement error: null & authentication is not done, autherntication: false
                return done(null, false);
            }
            // if user found
            return done(null, user);
        });
    }


));

// serialize the user to decide which key is to be kpt in cookies
passport.serializeUser(function(user, done){
    // since user is already passed, we just wanted to store user Id in ecrypted format, 
    // its automatically encrypot it into the cookie
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    // find user if its exist in DB
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        // error: null, user: user because user is found
        return done(null, user);
    });
});

// this function will be used as middleware
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    // passport have method isAuthenticated to check authentication
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signin');
}
// Once user is signed in
passport.setAuthenticatedUser = function(req, res, next){
    // if the request is authenticated
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

