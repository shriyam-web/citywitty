import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import WebsiteHit from "@/models/WebsiteHit";

export async function GET() {
  try {
    await dbConnect();
    const record = await WebsiteHit.findOne().lean();
    return NextResponse.json({ count: record?.count ?? 0 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch hit count", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await dbConnect();
    const record = await WebsiteHit.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({ count: record.count });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update hit count", details: error.message },
      { status: 500 }
    );
  }
}
