//this is our main file

//first define our port where express server is running
const port = 4000;
const express = require("express"); //import the express
const app = express();//instance of app using express
const mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");// get our backend directory in express app
const cors=require("cors");
const { error } = require("console");
const { type } = require("os");

//intialize the dependencies
app.use(express.json());// now whatever our request it will go through the json
app.use(cors());//express connect to port 4000

//mogodb connection
mongoose.connect("mongodb+srv://root:root@cluster0.qtx68.mongodb.net/ecommer")

//create api end point or api creation
app.get("/" ,(req, res)=>{
    res.send("Express App is Running");
});
app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port " + port);
    }
    else{
        console.log("Error :" + error);
    }
});


//schema for database -->this is done by using mongoose
const Product =mongoose.model("Product" ,{
   id:{
    type:Number,
    required:true,  //this is b/c this is our primary key 
   },
   name:{
    type:String,
    required:true,
   },
   image:{
    type:String,
    required:true,
   },
   category:{
    type:String,
    required:true,
   },
   newPrice:{
    type:Number,
    required:true,
   },
   oldPrice:{
    type:Number,
    required:true,

   },
   date:{
    type:Date,
    default:Date.now,
   },
   avilable:{
    type:Boolean,
    default:true,
   },


});

//this api to add product in data
app.post("/addproduct" , async(req , res)=>{
   const product = new Product({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    newPrice:req.body.newPrice,
    oldPrice:req.body.oldPrice

   });
   console.log(product);
   //save the product the database
   await product.save();
   console.log("Saved");
   res.json({  // this is what we get 
 success:true,
 name:req.body.name,
 
   });
});

//api to remove the product from database
app.post("/removeproduct" , async(req , res)=>{
//for deleting  we use findoneanddelete function
await Product.findOneAndDelete({id:req.body.id});
console.log("removed");
res.json({
success:true,
name:req.body.name
});
});

//api to get or display all product we have
app.get("/allproducts" , async(req,res)=>{
    //this can done by using find fucniton
      let products = await Product.find();
      console.log("All products are display");
      res.send(products);
});