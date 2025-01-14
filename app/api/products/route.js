import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/d";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/model/product-schema";
 export async function GET(){
await mongoose.connect(connectionSRT)
const data=await User.find()
console.log(data);
return NextResponse.json({result:data})
}