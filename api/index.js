import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from"dotenv";
import cors from "cors";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import cart from "./routes/cart.js";
import product from "./routes/product.js";
import category from "./routes/category.js";
const app =express();



dotenv.config();
mongoose.connect(process.env.MONGODB_URL||"mongodb://192.168.1.2:27017/amazona").then(()=>console.log("database connected succeffuly")).catch(()=>console.log("database error"));

app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use("/api/auth",auth);
app.use("/api/users",user);
app.use("/api/cart",cart);
app.use("/api/products",product);
app.use("/api/category",category);


app.listen(5000,()=>{
    console.log("server is running on port 5000")
})