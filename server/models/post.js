var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types;
var PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        require:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});

var Post = mongoose.model("Post",PostSchema);
module.exports = Post;