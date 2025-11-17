import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/partner/partner/partner.schema';

/**
 * API Route: /api/google-reviews/update-merchant
 * Updates a merchant's cached Google reviews data in the database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, placeId, forceRefresh } = body;

    if (!merchantId || !placeId) {
      return NextResponse.json(
        { error: 'Merchant ID and Place ID are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the merchant
    const merchant = await Partner.findOne({ merchantId });

    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      );
    }

    // Check if we need to refresh (cache for 12 hours)
    const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    const now = new Date();
    const lastFetched = merchant.googleReviews?.lastFetched;

    if (!forceRefresh && lastFetched && (now.getTime() - new Date(lastFetched).getTime() < CACHE_DURATION)) {
      return NextResponse.json({
        success: true,
        cached: true,
        data: merchant.googleReviews,
        message: 'Using cached data',
      });
    }

    // Fetch fresh data from Google
    const apiKey = process.env.GOOGLE_MAPS_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API is not configured' },
        { status: 500 }
      );
    }

    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const response = await fetch(placeDetailsUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status);
      return NextResponse.json(
        { error: 'Failed to fetch place details from Google' },
        { status: 400 }
      );
    }

    const result = data.result;

    // Update merchant with fresh Google reviews data
    merchant.googlePlaceId = placeId;
    merchant.googleReviews = {
      rating: result.rating || 0,
      userRatingsTotal: result.user_ratings_total || 0,
      reviews: result.reviews || [],
      lastFetched: now,
    };

    await merchant.save();

    revalidatePath(`/merchants/${merchant.merchantSlug}`);

    return NextResponse.json({
      success: true,
      cached: false,
      data: merchant.googleReviews,
      message: 'Google reviews updated successfully',
    });

  } catch (error: any) {
    console.error('Error updating merchant Google reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}