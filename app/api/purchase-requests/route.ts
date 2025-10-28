export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import PurchaseRequest from "@/models/OfflinePurchaseRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      userId,
      userName,
      userMobileNo,
      productPurchased,
      merchantId,
      merchantSlug,
      purchaseAmount,
      finalAmount,
      discountApplied,
    } = await req.json();

    if (
      !userId ||
      !userName ||
      !userMobileNo ||
      !productPurchased ||
      !merchantId ||
      !merchantSlug ||
      typeof purchaseAmount !== "number" ||
      typeof finalAmount !== "number" ||
      typeof discountApplied !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const purchaseRequest = await PurchaseRequest.create({
      userId,
      userName,
      userMobileNo,
      productPurchased,
      merchantId,
      merchantSlug,
      purchaseAmount,
      finalAmount,
      discountApplied,
      status: 'pending',
    });

    return NextResponse.json(
      { message: "Purchase recorded", purchaseRequest },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Purchase request API error:", error);
    return NextResponse.json(
      { error: "Failed to record purchase", details: error.message },
      { status: 500 }
    );
  }
}
