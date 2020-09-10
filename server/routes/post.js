var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var requireLogin = require('../middleware/requireLogin');
var Post  = require('../models/post');


router.get('/allpost',(req,res)=>{
    // first method to get posts

    // Post.find({},(err,posts)=>{
    //     if(err) throw err;
    //     res.json({posts:posts});
    // })


    // second method to get posts

    Post.find().populate("postedBy","_id name").
    then(posts=>{
        res.json({posts:posts});
    })
    .catch(err=>{
        console.log(err);
    });
});

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(post=>{
        res.json({post:post})
    })
    .catch(err=>{
        console.log(err);
    });
});

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
        res.status(422).json({message:"Please filled all fields!"});
    }
    req.user.password =undefined;
    const post = new Post ({
        title,
        body,
        photo:pic,
        postedBy:req.user
    });
    post.save().then(post=>{
        res.json({post:post});
    })
    .catch(err=>{
        console.log(err);
    });
    
});

module.exports = router;