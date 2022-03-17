import express from "express";
import slugify from "slugify";
import auth from "../middleware/auth.js";
import Category from "../models/category.js"
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

//CREATE CATEGORY
router.post("/create",upload.single("cateImg"),auth,async(req,res)=>{
  try{
    if(req.user.isAdmin){
      const newcategory= new Category({
        name:req.body.name,
        img:req.file.originalname||"",
        slug:slugify(req.body.name),
        parentId:req.body.parentId||null
      })
      const category= await newcategory.save();
      res.status(202).json({category,msg:"the Category created succefuly"})
    }else{
      return res.status(401).json({msg:"Access denied"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//UPADETE CATEGORY
router.put("/upadate/:id",auth,upload.single("cateImg"),async(req,res)=>{
  try{
    if(req.user.isAdmin){
      const category= await Category.findByIdAndUpdate(req.params.id,
      {$set:{
        name:req.body.name,
        slug:slugify(req.body.name),
        img:req.file.originalname||"",
        parentId:req.body.parentId||null
      }},
      {new:true})
      res.status(202).json({category,msg:"the Category updated succefuly"})
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
       await Category.findByIdAndDelete(req.params.id)
      res.status(202).json({msg:"the Category deleted succefuly"})
    }else{
      return res.status(401).json({msg:"Acces denied"})
    }
  }catch(err){
    res.status(500).json({msg:err})
  }
})

// CATEGORIS RETIRNED STYLE
function Caty(categories,parentId=null){
  let categoryList=[]
  let category;
  if(!parentId){
    category=categories.filter(c=>c.parentId===undefined)
  }else{
    category=categories.filter(c=>c.parentId===parentId)
  }
  for(let cate in category){
    categoryList.push({
      _id:cate._id,
      name:cate.name,
      slug:cate.slug,
      childrens:Caty(categories,cate._id)
    })
  }
  return categoryList;
}
//GET ALL categories
router.get("/allcategories/",async(req,res)=>{
  
  try{
    
     const categories= await Category.find();
     !user&&res.status(404).json({msg:"Category not found"})
     const caty=Caty(categories)
      res.status(202).json({categories:caty})

  }catch(err){
    res.status(500).json({msg:err})
  }
})



export default router;