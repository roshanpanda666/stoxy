import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/d";
import { NextResponse } from "next/server";
 export async function GET(){
await mongoose.connect(connectionSRT)
return NextResponse.json({result:true})
}