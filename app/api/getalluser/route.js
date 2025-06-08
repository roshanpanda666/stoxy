import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionSRT)
    const data=await UserM.find()
    console.log(data);
    return NextResponse.json(data)
}