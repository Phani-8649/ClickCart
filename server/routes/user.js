const { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");


const User = require("../models/User");
const CryptoJS = require("crypto-js");

const router=require("express").Router();

// update 

router.put("/:id",verifyTokenandAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.arguments.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err);
    }
});


// delete
router.delete("/:id",verifyTokenandAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user have been deleted")
    }catch(err){
        res.status(500).json(err);
    }
})



// get users
router.get("/find/:id",verifyTokenandAdmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const{password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})


// get all users
router.get("/",verifyTokenandAdmin,async(req,res)=>{
    const query=req.query.new
    try{
        const users=query?await User.find().sort({_id:-1}).limit(5):await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})

// get user stats 
router.get("/stats",verifyTokenandAdmin,async(req,res)=>{
    const date=new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data =await User.aggregate([
            {$match:{createdAt :{$gte:lastyear}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1},
                }
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;