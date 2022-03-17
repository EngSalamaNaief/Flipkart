import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    cartItems:[
      {
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Product", required:true},
        price:{type:Number, required:true},
        qty:{type:Number, default:1 },
      }
      ]
  
}, {timestamps:true})
3
const cart= new mongoose.model("Cart", cartSchema);
export default cart;