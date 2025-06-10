import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    await mongoose.connect(connectionSRT);
    const { id } = params;
    const { buying } = await request.json();

    const updatedUser = await UserM.findByIdAndUpdate(
      id,
      { buying },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Buying status updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating buying status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
