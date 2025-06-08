import mongoose from "mongoose";

const UserModel= new mongoose.Schema({
    
    email: { type: String, required: true },
    username: { type: String, required: true },
    products: [
        {
          brand: String,
          price: Number,
          quantity: Number,
          _id: false, // avoid subdocument _id
        },
      ],
    password: { type: String, required: true }, 
    buying: { type: String, required: true },
})
export const UserM = mongoose.models.stockss || mongoose.model("stockss", UserModel); 