const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    // it must refer to user schema as post is linked to user
    user: {
        // object ID is refering to studio3T objectID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
],
likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }
]
},{
    // timestamps are somethings which are introduced to fields in DB = created at in fields
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;