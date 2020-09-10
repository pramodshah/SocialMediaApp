var express = require('express');
var app = express();

var mongoose = require('mongoose');
var {MONGOURI} = require("./config/keys.js");
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


var PORT = 5000;
mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("MongoDB Connected...");
    }else{
        console.log(err);
    }
});


app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
});