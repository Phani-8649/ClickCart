const { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");

const Product = require("../models/Product");
const CryptoJS = require("crypto-js");

const router=require("express").Router();

// create 

router.post("/",verifyTokenandAdmin,async(req,res)=>{
    const newproduct=new Product(req.body);
    try{
        const savedproduct=await newproduct.save();
        res.status(200).json(savedproduct);
    }catch(err){
        res.status(500).json(err);
    }
})

// update 

router.put("/:id",verifyTokenandAdmin,async(req,res)=>{

    try{
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});


// delete
router.delete("/:id",verifyTokenandAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product have been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})



// get products
router.get("/find/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})


// get all products
router.get("/",async(req,res)=>{
    const qnew=req.query.new;
    const qcat=req.query.category;
    try{
        let products;
        if(qnew){
            products=await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(qcat){
            products=await Product.find({categories:{
                $in:[qcat],
            }})
        }
        else{
            products=await Product.find()
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;