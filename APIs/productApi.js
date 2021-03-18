//import express module
const exp = require("express");
const productApiObj = exp.Router();


//import express-async-handler
const asyncErrHandler = require("express-async-handler");

//import cloudinary
const cloudinary = require("cloudinary").v2;

//import multer-storage-cloudinary
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//import multer
const multer = require("multer");

//configure cloudinary
cloudinary.config({ 
    cloud_name: 'dl9nnxdio', 
    api_key: '552645319879562', 
    api_secret: 'qSL3sPqRQ9t5mnY5IN6VWXr9Llo' 
  });

//configure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecommerce',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });



//extract the body of req obj
productApiObj.use(exp.json());


//post request handler fro creating a product
productApiObj.post("/createproduct", upload.single('photo'), asyncErrHandler(async(req,res,next)=>{
    
    //get productCollectionObject
    const productCollectionObject = req.app.get("productCollectionObject");

    let productObj =  JSON.parse(req.body.productObj)
    //let productObj = req.body;

    //console.log(req.body.productObj)

    //check for product in db
    let product = await productCollectionObject.findOne({name:productObj.name});

    //if username already taken
    if(product!==null){
        res.send({message:"product existed"});
    }
    else{
         //add userImagelink
         productObj.userImgLink = req.file.path;

        //create product
        let success = await productCollectionObject.insertOne(productObj);
        res.send({message:"product added"});
    }
}))


//get product from db
productApiObj.get("/getproducts", asyncErrHandler(async(req,res,next)=>{
    //get product collection object
    let productCollectionObject = req.app.get("productCollectionObject");

    let productObj = await productCollectionObject.find().toArray();
    
    res.send({message:productObj});
    //console.log(productObj);
    
}))

//get one product from db based on product name
productApiObj.get("/getproduct/:name", asyncErrHandler(async(req,res,next)=>{

    //get product collection object
    let productCollectionObject = req.app.get("productCollectionObject");

    let productObj = await productCollectionObject.findOne({name:req.params.name});
    //console.log("name:",req.params.name);
    res.send({message:productObj});
    //console.log("product object:",productObj);
}))

//export
module.exports = productApiObj;
