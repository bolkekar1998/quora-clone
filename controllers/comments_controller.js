const Comment = require('../models/comment');
const Post = require('../models/post')
const Like = require('../models/like');


// we need to create a comment over a post
module.exports.create = function(req, res) {
    // find post with that post id
    Post.findById(req.body.post, function(err, post) {
        if (post) {
            // create a cooment
            Comment.create({
                content: req.body.content,
                // found post with the same ID 
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // adding comment to post, updating it(post)
                // push is given by mongo db, this comment will push to the post
               post.comments.push(comment);
               // when ever commit changes use save() to tell db this is the final version
               post.save(); 

               res.redirect('/');
            });
        }
    })
}