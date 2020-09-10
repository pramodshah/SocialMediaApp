var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');

var requireLogin = require('../middleware/requireLogin');

router.get('/',(req,res)=>{
    res.send("hello world");
});




router.post('/signup',(req,res)=>{ 
    const {name,email,password} = req.body;
    
    if(!name || !email || !password){
        return res.status(422).json({error:"Please fill all fields"});
    }else{
        User.findOne({email:email}).then((savedUser)=>{
            if(savedUser){
               return res.json({error:"Email is alreday exists with this email"});
            }
            bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const user = new User({
                    name,
                    email,
                    password:hashedpassword
                })
                user.save().then(user=>{
                    res.json({message:"Saved Successfully"});
                })
                .catch(err=>{
                    console.log(err);
                });   

            });
            
        })
        .catch(err=>{
            console.log(err)
        });
    }

    
    


});

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || ! password){
        return res.status(422).json({error:"Invalid email or password!"});
    }

    User.findOne({email:email}).then((savedUser=>{
        if(!savedUser){
            return res.json({error:"Email is not registereed!!"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                var token = jwt.sign({_id:savedUser._id,},JWT_SECRET);
                const {_id,name,email} = savedUser;
                res.json({message:"You are signed in successfully!",token:token,user:{_id,name,email}});
            }else{
                return res.status(422).json({error:"Invalid password!"});
            }
        })
        .catch(err=>{
            console.log(err);
        })


    }))
    .catch(err=>{
        console.logo(err);
    })

})
module.exports = router;