//import express module
const exp = require("express");
const cardApiObj = exp.Router();

//import express-async-handler
const asyncErrHandler = require("express-async-handler");

//extract the body of req obj
cardApiObj.use(exp.json());

//post req handler to add a product to usercart
cardApiObj.post("/addToCart", asyncErrHandler(async(req,res,next)=>{

    //get cart Collection object 
    let cardCollectionObject =  req.app.get("cardCollectionObject");

    cardObj = req.body
    //console.log(cardObj);

    //check fro card in card colection
    let card = await cardCollectionObject.findOne({name:cardObj.name, username:cardObj.username});

    // if card already exists in db 
    if(card !== null){
        res.send({message:"card already existed"});
    }

    // if there exists no card with pno
    else{
        
        //insert card in to card collection
        let cardObject = await cardCollectionObject.insertOne(cardObj);

        res.send({message:"card inserted"});
       // console.log("card object:",cardObject);
    }
}))

//get cards from db based on the username
cardApiObj.get("/getcards/:username", asyncErrHandler(async(req,res,next)=>{
    //get card collection object
    let cardCollectionObject = req.app.get("cardCollectionObject");

    let username = req.body;
  

    let cardObj = await cardCollectionObject.find({username:req.params.username}).toArray();
    
    res.send({message:cardObj});
   // console.log("Products of given username is ",cardObj);
}))



//get no of products for a username
cardApiObj.get("/getdetails/:username", asyncErrHandler(async(req,res,next)=>{

    let cardCollectionObject = req.app.get("cardCollectionObject");

    let cart = await cardCollectionObject.find({username:req.params.username}).toArray();
    
    res.send({message:cart});
    //console.log("product is",cart);

}))

//export
module.exports = cardApiObj;
