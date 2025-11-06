import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
import OfflineProduct from "@/models/OfflineProduct";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { merchantSlug: string } }
) {
    try {
        await dbConnect();

        const { merchantSlug } = params;

        console.log('🔍 Looking for merchant with slug:', merchantSlug);

        // First, find the merchant to get their merchantId
        const merchant = await Partner.findOne({ merchantSlug, status: "active" });

        if (!merchant) {
            console.log('❌ Merchant not found for slug:', merchantSlug);
            return NextResponse.json(
                { error: "Merchant not found" },
                { status: 404 }
            );
        }

        console.log('✅ Found merchant:', {
            merchantId: merchant.merchantId,
            _id: merchant._id?.toString(),
            displayName: merchant.displayName
        });

        // Try both merchantId and _id to find products
        const merchantIdStr = merchant.merchantId;
        const objectIdStr = merchant._id?.toString();

        console.log('🔍 Searching for products with merchantId:', merchantIdStr);
        console.log('🔍 Also trying _id:', objectIdStr);

        // Fetch offline products for this merchant (try both merchantId and _id)
        const offlineProducts = await OfflineProduct.find({
            $or: [
                { merchantId: merchantIdStr },
                { merchantId: objectIdStr }
            ],
            status: "active"
        }).sort({ createdAt: -1 });

        console.log('📦 Found offline products:', offlineProducts.length);
        if (offlineProducts.length > 0) {
            console.log('First product:', {
                productName: offlineProducts[0].productName,
                merchantId: offlineProducts[0].merchantId
            });
        }

        return NextResponse.json({
            success: true,
            products: offlineProducts,
            count: offlineProducts.length
        });
    } catch (err: any) {
        console.error("❌ API Error:", err);
        return NextResponse.json(
            { error: "Failed to fetch offline products", details: err.message },
            { status: 500 }
        );
    }
}