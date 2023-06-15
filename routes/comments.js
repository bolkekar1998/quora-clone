// step 15
const express = require('express');
const router = express.Router();
// authenticate post so no one can come and edit on console and try to post 
const passport = require('passport');

const commentsControllers = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication,commentsControllers.create);
// router.get('/destroy/:id', passport.checkAuthentication, commentsControllers.destroy);

module.exports = router;