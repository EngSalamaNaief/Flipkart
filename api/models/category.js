import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    slug:{type:String,required:true},
    img:{type:String,default:""},
    parentId:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
}, {timestamps:true})
3
const category= new mongoose.model("Category", categorySchema);
export default category;