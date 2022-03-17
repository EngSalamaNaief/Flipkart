import express from "express";
import auth from "../middleware/auth.js";
import Cart from "../models/cart.js";
const router =express.Router();


//ADD PRODUCTS TO CART
router.post("/addtocart",auth,async(req,res)=>{
  let carts={};
  try{
    const cartExist=await Cart.findOne({userId:req.user._id});
    if(cartExist){
      const productExist= cartExist.find(c=>c.cartItems.product===req.body.cartItems.product);
      if(productExist){
        carts = await Cart.findOneAndUpdate({userId:req.user._id,"cartItems.product":req.body.cartItems.product},{
          "$set":{
            "cartItems.$":{
             product: req.body.cardItems.product,
             price:req.body.cardItems.price,
             qty:req.body.cardItems.qty
              
            }
          }
        },{new:true});
      }else{
      carts = await Cart.findOneAndUpdate({userId:req.user._id},{
          "$push":{
            "cartItems":req.body.cardItems
          }
        },{new:true});
      }
    }else{
      const cart=new Cart({
        userId:req.user._id,
        cartItems:[req.body.cartItems]
      })
      carts=await cart.save();
    }
    res.status(201).json({cart:carts})
  }catch(err){
    res.status(500).json({msg:err})
  }
})
//ADD PRODUCTS TO CART
router.put("/delete",auth,async(req,res)=>{
  
  try{
   
   const cart = await Cart.findOneAndUpdate({userId:req.user._id,"cartItems.product":req.body.cartItems.product},{
          "$pull":{
            "cartItems":req.body.cardItems
          }
        },{new:true});
      
    
    res.status(201).json({cart})
  
  }catch(err){
    res.status(500).json({msg:err})
  }
})

//GET CART cardItems
router.get("/getcart",auth,async (req,res)=>{
    try{
   
   const cart = await Cart.findById(req.user._id);
      
    
    res.status(201).json({cart})
  }catch(err){
    res.status(500).json({msg:err})
  }
})

export default router;