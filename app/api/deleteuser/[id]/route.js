import { connectionSRT } from "@/app/lib/d";
import { UserM } from "@/app/lib/model/user-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await mongoose.connect(connectionSRT);

    const { id } = params;

    const deletedUser = await UserM.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
