import dbConnect from "@/lib/mongodb";
import Partner from "@/models/partner/partner";
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

        // Auto-refresh Google reviews if stale (cache for 12 hours)
        const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
        const now = new Date();
        const lastFetched = merchant.googleReviews?.lastFetched;
        const hasPlaceId = merchant.googlePlaceId;

        if (hasPlaceId && (!lastFetched || (now.getTime() - new Date(lastFetched).getTime() > CACHE_DURATION))) {
            // Fetch fresh Google reviews in background (don't wait for it)
            fetchGoogleReviews(merchant.googlePlaceId, merchant.merchantId).catch(err => {
                console.error('Background Google reviews fetch failed:', err);
            });
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

// Helper function to fetch Google reviews in background
async function fetchGoogleReviews(placeId: string, merchantId: string) {
    try {
        const apiKey = process.env.GOOGLE_MAPS_KEY;
        if (!apiKey) return;

        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;

        const response = await fetch(placeDetailsUrl);
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            const result = data.result;
            
            // Update merchant with fresh data
            await Partner.findOneAndUpdate(
                { merchantId },
                {
                    googleReviews: {
                        rating: result.rating || 0,
                        userRatingsTotal: result.user_ratings_total || 0,
                        reviews: result.reviews || [],
                        lastFetched: new Date(),
                    }
                }
            );
        }
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
    }
}
