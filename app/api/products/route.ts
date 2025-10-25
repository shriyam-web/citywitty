import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const merchantSlug = searchParams.get('merchantSlug');

        // Build query for active partners
        const query: any = { status: "active" };

        if (merchantSlug) {
            query.merchantSlug = merchantSlug;
        }

        // Fetch partners with their products
        const partners = await Partner.find(query)
            .select("merchantSlug displayName category city products")
            .lean();

        // Flatten products from all merchants
        let allProducts: any[] = [];

        partners.forEach((partner: any) => {
            if (partner.products && partner.products.length > 0) {
                partner.products.forEach((product: any) => {
                    allProducts.push({
                        ...product,
                        merchantSlug: partner.merchantSlug,
                        merchantName: partner.displayName,
                        merchantCategory: partner.category,
                        merchantCity: partner.city,
                    });
                });
            }
        });

        // Filter by category if specified
        if (category) {
            allProducts = allProducts.filter(product =>
                product.productCategory?.toLowerCase() === category.toLowerCase() ||
                product.category?.toLowerCase() === category.toLowerCase()
            );
        }

        return NextResponse.json({
            products: allProducts,
            total: allProducts.length,
            merchants: partners.length
        });
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json(
            { error: "Failed to fetch products", details: err.message },
            { status: 500 }
        );
    }
}
