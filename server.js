//import express module
const exp = require("express");
const app = exp();

//import mongodb module
const mc = require("mongodb").MongoClient;

//import path module
const path = require("path");

//import dotenv module
require("dotenv").config();

//import API objects
//userAPIObj
const userApiObj = require("./APIs/userApi");

//adminAPiObj
const adminApiObj = require("./APIs/adminApi");

//productApiObj
const productApiObj = require("./APIs/productApi");

//cardApiObj
const cardApiObj = require("./APIs/cardApi");

//forward the api objects
//forward userApiObj
app.use("/user",userApiObj);

//forward adminApiobj
app.use("/admin",adminApiObj);

//forward productApiObj
app.use("/product",productApiObj);

//forward cardApiObj
app.use("/card",cardApiObj);

//connect both backend and frontend
app.use(exp.static(path.join(__dirname,"./dist/ecommerceApp")));

//dburl
const dburl = process.env.dburl;
//connect with database
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database Object
    const databaseObject = client.db("Ecommerce");

    //get APICollectionObjects
    const userCollectionObject = databaseObject.collection("usercollection");
    const adminCollectionObject = databaseObject.collection("admincollection");
    const productCollectionObject = databaseObject.collection("productcollection");
    const cardCollectionObject = databaseObject.collection("cardcollection");

    //share apiObjects
    app.set("userCollectionObject",userCollectionObject)
    app.set("adminCollectionObject",adminCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
    app.set("cardCollectionObject",cardCollectionObject)

    console.log("Connected to db server..")
})
.catch(err=>{console.log("Err in db connnection..",err)})

//middleware to handle invalid path
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid path`});
})

//middleware for error handling
app.use((req,res,next)=>{
    res.send({message:"Some Error Occurred",reason:err.message});
})

//assign port
const port = process.env.port;
app.listen(port, ()=>{console.log(`Web server is listening on port ${port}..`)})