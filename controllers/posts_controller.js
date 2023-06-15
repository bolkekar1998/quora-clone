const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');



module.exports.create = function(req, res){
    // create the post
    Post.create({
        // content is come from name of home.ejs of post and 
        // from schema of post also
        content: req.body.content,
        // save user also whose login 
        // why id, we just want to store the ID not whole user object
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        // if I get the post, first authenticate whether it is same user or not.
        // post.user will return string iD
        // ideally we have to do _id but when we are comparing two ids we must convert it into string
        // mongoose have given ._id as .id variant version, its converting it into string
        if (post.user == req.user.id) {
            post.remove();
            Like.deleteMany({likeable: post, onModel: 'Post'});
            Like.deleteMany({_id: {$in: post.comments}});
            // deletemany, will delete all comments with query, and post: req.params.id strings are matched
            Comment.deleteMany({post: req.params.id}, function(err) {
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}