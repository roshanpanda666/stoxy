import { connectionSRT } from "@/app/lib/d";
import { User } from "@/app/lib/model/product-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request,Content){
    const filtered= Content.params.putapi
    console.log(filtered);
    const data={_id:filtered}
    const payload=await request.json()
    console.log(payload);
    await mongoose.connect(connectionSRT)
    const result=await User.findOneAndUpdate(data,payload)
    return NextResponse.json({result,success:true})

}

export async function GET(request,Content){
    const filtered = Content.params.putapi
    const record={_id:filtered}
    await mongoose.connect(connectionSRT)
    const result= await User.findById(record)
    return NextResponse.json({result,success:true})
}