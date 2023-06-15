const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    // define user
    user: {
        type: mongoose.Schema.ObjectId,
    },
    // this defines the object id of the liked comment
    // Store 2 things the type on which like have been placed & object id on which like have been placed 
    // type could be post or comment & objectID is the ID of post or comment
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        // tell that it is a dynamic
        // ref path means we have to place the path to some other feild and that field will decide which object the like have been done
        refPath: 'onModel'
    },
    // this field is used for defining type of the liked ibject since it is dynamic reference
    // like can be for post or a comment
    // this model will be a prooperty on likes itself
    onModel: {
        type: String,
        required: true,
        // values could be post or a comment due to likeable refpath, if we remove this feild likes can be of any value
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;