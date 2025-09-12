import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });

    return NextResponse.json({ exists: !!user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
