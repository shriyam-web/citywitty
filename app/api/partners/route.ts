import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = request.nextUrl;
    const all = searchParams.get('all') === 'true';

    const query = Partner.find({ status: "active" })
      .sort({ averageRating: -1 });

    if (!all) {
      query.limit(3);
    }

    const partners = await query.select(
      "merchantSlug displayName category city description logo averageRating ratings offlineDiscount customOffer citywittyAssured isPremiumSeller isVerified isTopMerchant isCWassured"
    );

    return NextResponse.json(partners);
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch partners", details: err.message },
      { status: 500 }
    );
  }
}
