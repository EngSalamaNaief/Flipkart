import express from "express";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.js";
import User from "../models/user.js"
import multer from "multer"
const router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//UPADETE USER
router.put("/upadate/:id",auth,upload.single("userImg"),async(req,res)=>{
  const salt =bcrypt.genSaltSync(10);
  try{
    if(req.params.id===req.user.id||req.user.isAdmin){
      const user= await User.findByIdAndUpdate(req.params.id,
      {$set:{
        username:req.body.username,
        email:req.body.email,
        profilePic:req.file?req.file.originalname: '',
        isAdmin:req.body.isAdmin,
        password:bcrypt.hashSync(req.body.password,salt)
      }},
      {new:true})
      res.status(202).json({user:user,msg:"the Acount updated succefuly"})
    }else{
      return res.status(401).json({msg:"Not Allowed to Update"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//DELETE USER
router.delete("/delete/:id",auth,async(req,res)=>{
  
  try{
    if(req.params.id===req.user.id||req.user.isAdmin){
       await User.findByIdAndDelete(req.params.id)
      res.status(202).json({msg:"the Acount deleted succefuly"})
    }else{
      return res.status(401).json({msg:"Not Allowed to Delete"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//GET USER BY ID
router.get("/getuser/:id",auth,async(req,res)=>{
  
  try{
    if(req.params.id===req.user.id||req.user.isAdmin){
     const user= await User.findById(req.params.id);
     !user&&res.status(404).json({msg:"user not found"})
     const {assword,...others}=user._doc;
      res.status(202).json({user:others})
    }else{
      return res.status(401).json({msg:"Not Allowed to getuser"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//GET ALL USER 
router.get("/allusers/",auth,async(req,res)=>{
  
  try{
    if(req.user.isAdmin){
     const user= await User.find();
     !user&&res.status(404).json({msg:"users not found"})
     
      res.status(202).json({users:others})
    }else{
      return res.status(401).json({msg:"Not Allowed to getusers"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})



export default router;