import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js"
const router=express.Router();

// REGISTER
router.post("/register",async(req,res)=>{
  const salt =bcrypt.genSaltSync(10);
  
  try{
    const newUser=new User({
      username:req.body.username,
      email:req.body.email,
      isAdmin:req.body.isAdmin||false,
      profilePic:user.body.profilePic||"",
      password:bcrypt.hashSync(req.body.password,salt)
    });
    const user=await newUser.save();
    console.log(user)
    const {password,...others}=await user._doc;
    jwt.sign({id:user._id,isAdmin:user.isAdmin},
            procces.env.SECRETCODE,
            {expiresIn:"30d"},
           function(err,token){
              if(err) return res.status(500).json({msg:err});;
              res.status(201).json({token,user:others})
            })
  }catch(err){
    res.status(500).json({msg:err})
  }
})

// LOGIN
router.post("/login",async(req,res)=>{
  
  try{
    const user= await User.find({email:req.body.email})
    !newUser&&res.status(401).json({msg:"Email Not Registred"})
    if(bcrypt.compaireSync(req.body.password,user.password)){
    const {password,...others}=await user._doc;
    jwt.sign({id:user._id,isAdmin:user.isAdmin},
            procces.env.SECRETCODE,
            {expiresIn:"30d"},
           function(err,token){
              if(err) return res.status(500).json({msg:err});
              res.status(201).json({token,user:others})
            })
    }
    
  }catch(err){
    res.status(500).json({msg:err})
  }
})

export default router;