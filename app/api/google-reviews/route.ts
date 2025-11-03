import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/google-reviews
 * Fetches Google Place Details including reviews, rating, and review count
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_KEY;

    if (!apiKey) {
      console.error('Google Maps API key is not configured');
      return NextResponse.json(
        { error: 'Google Maps API is not configured' },
        { status: 500 }
      );
    }

    // Fetch Place Details from Google Places API
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

    const response = await fetch(placeDetailsUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json(
        { 
          error: 'Failed to fetch place details',
          details: data.error_message || data.status 
        },
        { status: 400 }
      );
    }

    const result = data.result;

    return NextResponse.json({
      success: true,
      data: {
        name: result.name,
        rating: result.rating || 0,
        userRatingsTotal: result.user_ratings_total || 0,
        reviews: result.reviews || [],
      },
    });

  } catch (error: any) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}