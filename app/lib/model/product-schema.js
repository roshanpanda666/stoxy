import mongoose from "mongoose";

const productModel= new mongoose.Schema({
    
    brand: { type: String, required: true },
    price: { type: String, required: true },
    product: { type: String, required: false }, // Optional field
    type: { type: String, required: true },

})
export const User = mongoose.models.crudo || mongoose.model("crudo", productModel);