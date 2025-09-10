import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs'; // ✅ import bcrypt

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, role, provider = "credentials" } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { message: "Email and role are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
      role,
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found." },
        { status: 401 }
      );
    }

    if (provider === "credentials") {
      if (!password) {
        return NextResponse.json(
          { message: "Password is required." },
          { status: 400 }
        );
      }
      const isPasswordValid = await bcrypt.compare(password, user.password || "");
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Incorrect password." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      username: user.name,
      role: user.role,
      provider: user.provider,
    });
  } catch (err) {
    console.error("🔥 User login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

