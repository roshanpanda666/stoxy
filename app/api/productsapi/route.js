import { User } from "@/app/lib/model/product-schema";
import mongoose from "mongoose";
const { connectionSRT } = require("@/app/lib/d");
const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");


export async function GET(){

    await mongoose.connect(connectionSRT)
    const data = await User.find()
    console.log(data)
    return NextResponse.json({result:data,success:"true"})
}

export async function POST(request){
    const payload =await request.json()
    await mongoose.connect(connectionSRT)
    let user=new User(payload)
    const content=await user.save()
    return NextResponse.json({content,success:true})
}

