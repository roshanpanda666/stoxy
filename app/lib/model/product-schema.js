import mongoose from "mongoose";

const productModel= new mongoose.Schema({
    
    brand: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: false }, 
    

})
export const User = mongoose.models.stocks || mongoose.model("stocks", productModel); 