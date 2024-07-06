const { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");

const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");

const router=require("express").Router();

// create 

router.post("/",verifyToken,async(req,res)=>{
    const newcart=new Cart(req.body);
    try{
        const savedcart=await newcart.save();
        res.status(200).json(savedcart);
    }catch(err){
        res.status(500).json(err);
    }
})

// update 

router.put("/:id",verifyTokenandAuthorization,async(req,res)=>{

    try{
        const updatedcart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});res.status(200).json(updatedcart  );
    }catch(err){
        res.status(500).json(err);
    }
});


// delete
router.delete("/:id",verifyTokenandAdmin,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart have been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})



// get user cart
router.get("/find/:id",verifyTokenandAuthorization,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})


// get all products
router.get("/",verifyTokenandAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;