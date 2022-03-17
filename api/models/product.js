import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    slug:{type:String,required:true},
    avatar:{type:String,required:true},
    gallery:[{img:{type:String}}],
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    price:{type:Number,required:true},
    offer:{type:Number,default:null},
    countInStock:{type:Number,required:true},
    rating:{type:Number},
    views:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
}, {timestamps:true})
3
const product= new mongoose.model("Product",productSchema);
export default product;