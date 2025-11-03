import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/google-reviews/find-place
 * Helps find Google Place ID for a business using its name and address
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessName = searchParams.get('name');
    const address = searchParams.get('address');

    if (!businessName) {
      return NextResponse.json(
        { error: 'Business name is required' },
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

    // Build search query
    const query = address ? `${businessName}, ${address}` : businessName;
    const encodedQuery = encodeURIComponent(query);

    // Use Find Place API to get place_id
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedQuery}&inputtype=textquery&fields=place_id,name,formatted_address,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(findPlaceUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      
      if (data.status === 'ZERO_RESULTS') {
        return NextResponse.json({
          success: false,
          message: 'No results found. Try a different search query.',
          suggestions: [
            'Make sure the business name is spelled correctly',
            'Include the city or area name',
            'Try searching without special characters',
          ]
        }, { status: 404 });
      }

      return NextResponse.json(
        { 
          error: 'Failed to find place',
          details: data.error_message || data.status 
        },
        { status: 400 }
      );
    }

    const candidates = data.candidates || [];

    if (candidates.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No matching businesses found',
      }, { status: 404 });
    }

    // Return all candidates
    return NextResponse.json({
      success: true,
      results: candidates.map((candidate: any) => ({
        placeId: candidate.place_id,
        name: candidate.name,
        address: candidate.formatted_address,
        rating: candidate.rating,
        reviewCount: candidate.user_ratings_total,
      })),
    });

  } catch (error: any) {
    console.error('Error finding place:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}