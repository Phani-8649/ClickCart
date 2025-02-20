const router=require("express").Router();

const User=require("../models/User")


const CryptoJS=require("crypto-js");

const jwt=require("jsonwebtoken");

//register

router.post("/register",async(req,res)=>{
    console.log(req.body);
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        // password:req.body.password,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    // console.log(username);
    try{
        const savedUser= await newUser.save()
        //saves the new user to db
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err);
    }
});



//login

router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        !user && res.status(401).json("wrong credentials");
        const hashedpassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalpassword=hashedpassword.toString(CryptoJS.enc.Utf8);
        originalpassword !==req.body.password && 
            res.status(401).json("Enter valid credentials");
            const accessToken=jwt.sign({
                id:user.id,isAdmin:user.isAdmin,
            },process.env.JWT_SEC,{expiresIn:"3d"});
        const{password,...others}=user._doc;
        res.status(200).json({...others,accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;