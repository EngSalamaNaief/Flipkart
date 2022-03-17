import express from "express";
import path from "path";
import slugify from "slugify";
import auth from "../middleware/auth.js";
import Product from "../models/product.js"
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
//CREATE PRODUCTS
router.post("/create",auth,upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),async(req,res)=>{
  try{
    let productImgs=[];
    if(req.files["gallery"]){
      req.files["gallery"].map(img=>{
        productImgs.push[{img:img.originalname}]
      })
    }
    if(req.user.isAdmin){
      const newProduct= new Product({
        name:req.body.name,
        slug:slugify(req.body.name),
        desc:req.body.desc,
        price:req.body.price,
        offer:req.body.offer||null,
        countInStock:req.body.countInStock,
        rating:req.body.rating||0,
        category:req.body.category,
        views:req.body.views,
        createdBy:req.user._id,
        avatar:req.files["avatar"][0].originalname,
        gallery:productImgs||[],
       
      })
      const product= await newProduct.save();
      res.status(202).json({product,msg:"the product created succefuly"})
    }else{
      return res.status(401).json({msg:"Access denied"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})

//UPADETE PRODUCT
router.put("/upadate/:id",auth,upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),async(req,res)=>{
  try{
        let productImgs=[];
    if(req.files["gallery"]){
      req.files["gallery"].map(img=>{
        productImgs.push[{img:img.originalname}]
      })
    }
    if(req.user.isAdmin){
      const product= await Product.findByIdAndUpdate(req.params.id,
      {$set:{
        name:req.body.name,
        slug:slugify(req.body.name),
        desc:req.body.desc,
        price:req.body.price,
        offer:req.body.offer||null,
        countInStock:req.body.countInStock,
        rating:req.body.rating||0,
        category:req.body.category,
        views:req.body.views,
        createdBy:req.user._id,
        avatar:req.files["avatar"][0],
        gallery:productImgs
      }},
      {new:true})
      res.status(202).json({product,msg:"the Product updated succefuly"})
    }else{
      return res.status(401).json({msg:"Access denied"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//DELETE Category
router.delete("/delete/:id",auth,async(req,res)=>{
  
  try{
    if(req.user.isAdmin){
       await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({msg:"the Products deleted succefuly"})
    }else{
      return res.status(401).json({msg:"Acces denied"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})


//GET PRODUCT BY ID
router.get("/product/:id",async(req,res)=>{
  
  try{
    
     const product= await Product.findById(req.params.id);
     !user&&res.status(404).json({msg:"Product not found"})
     
      res.status(200).json({product})

  }catch(err){
    res.status(500).json({msg:err})
  }
})
//GET ALL PRODUCTS
router.get("/allproducts",async(req,res)=>{
  
  try{
    
     const products= await Product.find();
     !user&&res.status(404).json({msg:"Products not found"})
     
      res.status(200).json({products})

  }catch(err){
    res.status(500).json({msg:err})
  }
})



export default router;