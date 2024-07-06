const { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");

const Order = require("../models/Order");
const CryptoJS = require("crypto-js");

const router=require("express").Router();

// create 

router.post("/",verifyToken,async(req,res)=>{
    const neworder=new Order(req.body);
    try{
        const savedorder=await neworder.save();
        res.status(200).json(savedorder);
    }catch(err){
        res.status(500).json(err);
    }
})

// update 

router.put("/:id",verifyTokenandAdmin,async(req,res)=>{

    try{
        const updatedorder=await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});res.status(200).json(updatedorder)  ;
    }catch(err){
        res.status(500).json(err);
    }
});


// delete
router.delete("/:id",verifyTokenandAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order have been deleted");
    }catch(err){
        res.status(500).json(err);
    }
})



// get user orders
router.get("/find/:id",verifyTokenandAuthorization,async(req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})


// get all orders
router.get("/",async(req,res)=>{
    try{
        const orders=await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//get stats
// there is some error here 

router.get("/income", verifyTokenandAdmin, async (req, res) => {
    const date = new Date();
    const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousmonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            }, // Closing parenthesis for $project stage
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});



// chat gpt code 
// router.get("/income", verifyTokenandAdmin, async (req, res) => {
//     const date = new Date();
//     const lastmonth = new Date(date);
//     lastmonth.setMonth(lastmonth.getMonth() - 1);
//     const previousmonth = new Date(lastmonth);
//     previousmonth.setMonth(previousmonth.getMonth() - 1);
    
//     try {
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousmonth } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$amount",
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" },
//                 }
//             }
//         ]);
//         res.status(200).json(income);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



module.exports=router;