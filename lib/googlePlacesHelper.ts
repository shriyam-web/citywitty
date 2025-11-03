/**
 * Google Places Helper Utilities
 * Functions to help find and validate Google Place IDs
 */

export interface PlaceSearchResult {
  placeId: string;
  name: string;
  address: string;
  rating?: number;
  reviewCount?: number;
}

/**
 * Find Google Place ID for a business
 * @param businessName - Name of the business
 * @param address - Optional address to narrow down search
 * @returns Array of matching places
 */
export async function findGooglePlaceId(
  businessName: string,
  address?: string
): Promise<PlaceSearchResult[]> {
  try {
    const params = new URLSearchParams({
      name: businessName,
    });

    if (address) {
      params.append('address', address);
    }

    const response = await fetch(`/api/google-reviews/find-place?${params.toString()}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to find place');
    }

    return data.results || [];
  } catch (error) {
    console.error('Error finding place:', error);
    throw error;
  }
}

/**
 * Fetch Google reviews for a place
 * @param placeId - Google Place ID
 * @returns Google reviews data
 */
export async function fetchGoogleReviews(placeId: string) {
  try {
    const response = await fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch reviews');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    throw error;
  }
}

/**
 * Update merchant's Google reviews in database
 * @param merchantId - Merchant ID
 * @param placeId - Google Place ID
 * @param forceRefresh - Force refresh even if cached
 */
export async function updateMerchantGoogleReviews(
  merchantId: string,
  placeId: string,
  forceRefresh: boolean = false
) {
  try {
    const response = await fetch('/api/google-reviews/update-merchant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantId,
        placeId,
        forceRefresh,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to update reviews');
    }

    return data.data;
  } catch (error) {
    console.error('Error updating merchant Google reviews:', error);
    throw error;
  }
}

/**
 * Extract Place ID from Google Maps URL
 * @param url - Google Maps URL
 * @returns Place ID or null
 */
export function extractPlaceIdFromUrl(url: string): string | null {
  try {
    // Match patterns like:
    // https://www.google.com/maps/place/.../@...data=...!1s0x3bcb99daeaeaaaaa:0x1234567890abcdef
    // https://maps.app.goo.gl/...
    
    // Try to extract from various URL patterns
    const patterns = [
      /place_id=([A-Za-z0-9_-]+)/,
      /!1s([A-Za-z0-9_-]+)/,
      /maps\/place\/[^/]+\/([A-Za-z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting Place ID from URL:', error);
    return null;
  }
}

/**
 * Validate if a string is a valid Google Place ID format
 * @param placeId - String to validate
 * @returns true if valid format
 */
export function isValidPlaceIdFormat(placeId: string): boolean {
  // Google Place IDs are typically alphanumeric with underscores and hyphens
  // Usually around 27-30 characters long
  const placeIdRegex = /^[A-Za-z0-9_-]{15,100}$/;
  return placeIdRegex.test(placeId);
}