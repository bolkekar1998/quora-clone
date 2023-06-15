const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/signin', usersController.signIn);
router.post('/create', usersController.create);
// '/create-session' we should matchd it from views user sign in form action
// use passport as a middleware to authenticate
router.post('/create-session', 
// middleware
passport.authenticate(
    // if session failed, strategy: local
    'local',
    {failureRedirect: '/users/signin'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);
// This is give by passport, google will automatically recognise when request comes from this
// strategy: google, scope: it is the information which we are looking to fetch
// Profiel: Its an array of string
// email: email is not part of profile you have to take permission
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// this is the url at which I will recieve the data
// this will authenticate google
// finally if user sign in, then will take through usersController.createSession from controllers
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/signin'}), usersController.createSession);
 

module.exports = router;