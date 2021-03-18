//import express module
const exp = require("express");
const userApiObj = exp.Router();

//importmiddleware
//const verifyToken = require("./middlewares/verifyToken")

//import jsonwebtoken module
const jwt = require("jsonwebtoken");

//import express-async-handler
const asyncErrHandler = require("express-async-handler");

//import bcryptjs
const bcryptjs = require("bcryptjs");

//extract the body of req obj
userApiObj.use(exp.json());

//post req handler for user register
userApiObj.post("/register", asyncErrHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObject = req.app.get("userCollectionObject");
    
    console.log("user object is",req.body);
    let userObj = req.body;

    //check for user in db
    let user = await userCollectionObject.findOne({username:userObj.username});

    //if username already taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
        //hash the password
        let hashedpswd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpswd;

        //create user
        let success = await userCollectionObject.insertOne(userObj);
        res.send({message:"user created"});
    }
   // console.log("user obj is",req.body);
}))

//get request handler
userApiObj.post("/login",asyncErrHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObject = req.app.get("userCollectionObject");

    let userCredObj = req.body;
    //verify  username
    let user = await userCollectionObject.findOne({username:userCredObj.username})

    if(user == null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({username:user.username},process.env.secret,{expiresIn:10});

            //send token
            res.send({message:"success",signedToken:token,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))

//put request handler for password reset
userApiObj.post("/resetpassword", asyncErrHandler(async(res,req,next)=>{
    //get userCollection object
    let userCollectionObject = req.app.get("userCollectionObject");

    let userObj = req.body;

    console.log("user obj is",userObj);

    let hash = await bcryptjs.hash(userObj.newpassword,6);
    
    //update user obj with new paswd
    
    let success = await userCollectionObject.updateOne({username:userObj.username},{$set:{
        password:hash,
    }})
    //console.log("pswd updated!")
    res.send({message:"success"});
}))







//export
module.exports = userApiObj;
