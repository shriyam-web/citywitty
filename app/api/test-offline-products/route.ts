import dbConnect from "@/lib/mongodb";
import OfflineProduct from "@/models/OfflineProduct";
import Partner from "@/models/partner/partner";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await dbConnect();

        console.log('🧪 Testing offline products...');

        // Get all offline products
        const allProducts = await OfflineProduct.find({}).limit(5);
        console.log('Total products in collection:', await OfflineProduct.countDocuments());
        console.log('Sample products:', allProducts.length);

        if (allProducts.length > 0) {
            console.log('First product:', {
                offlineProductId: allProducts[0].offlineProductId,
                merchantId: allProducts[0].merchantId,
                productName: allProducts[0].productName,
                status: allProducts[0].status
            });
        }

        // Get all partners
        const allPartners = await Partner.find({ status: "active" }).limit(5);
        console.log('Total active partners:', await Partner.countDocuments({ status: "active" }));

        if (allPartners.length > 0) {
            console.log('First partner:', {
                merchantId: allPartners[0].merchantId,
                _id: allPartners[0]._id?.toString(),
                displayName: allPartners[0].displayName,
                merchantSlug: allPartners[0].merchantSlug
            });
        }

        return NextResponse.json({
            success: true,
            totalProducts: await OfflineProduct.countDocuments(),
            totalPartners: await Partner.countDocuments({ status: "active" }),
            sampleProducts: allProducts.map(p => ({
                offlineProductId: p.offlineProductId,
                merchantId: p.merchantId,
                productName: p.productName,
                status: p.status
            })),
            samplePartners: allPartners.map(p => ({
                merchantId: p.merchantId,
                _id: p._id?.toString(),
                displayName: p.displayName,
                merchantSlug: p.merchantSlug
            }))
        });
    } catch (err: any) {
        console.error("❌ Test API Error:", err);
        return NextResponse.json(
            { error: "Test failed", details: err.message },
            { status: 500 }
        );
    }
}