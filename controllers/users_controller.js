const User = require('../models/user')
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signin', {
        title: "Quora - A place to share knowledge"
    })
}

module.exports.create = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            console.log('error in finding user in signing up');
            return;
        }
        // if user not found, create user
        if (!user) {
            User.create(req.body,
                // if password does not match
            function(err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/signin');
            }) 
            // if user is already present
        }else{
            return res.redirect('back');
        }
    })
}

// the user is signed in we have to redirect
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    // logout is inbuild function of passport
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

