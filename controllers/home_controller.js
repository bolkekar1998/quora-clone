const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = function(req, res){
    // populate the user 
    Post.find({})
    // the whole user object will be prepopulate here
    .populate('user')
    // call back function
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('comments')
    .populate('likes')

    .exec(function(err, posts) {
        return res.render('home', {
            title: "Codeial | Home",
            posts : posts
        });   
    })
}
