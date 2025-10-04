import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { merchantSlug: string } }
) {
    try {
        await dbConnect();

        const { merchantSlug } = params;

        const merchant = await Partner.findOne({ merchantSlug, status: "active" });

        if (!merchant) {
            return NextResponse.json(
                { error: "Merchant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(merchant);
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json(
            { error: "Failed to fetch merchant", details: err.message },
            { status: 500 }
        );
    }
}
