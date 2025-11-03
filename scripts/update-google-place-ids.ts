/**
 * Script to bulk update Google Place IDs for existing merchants
 * Run with: npx ts-node scripts/update-google-place-ids.ts
 */

import dbConnect from '../lib/mongodb';
import Partner from '../models/partner/partner/partner.schema';

const API_KEY = process.env.GOOGLE_MAPS_KEY;

interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
}

/**
 * Find Google Place ID for a business
 */
async function findPlaceId(businessName: string, address: string): Promise<PlaceSearchResult | null> {
  if (!API_KEY) {
    throw new Error('GOOGLE_MAPS_KEY not configured');
  }

  const query = `${businessName}, ${address}`;
  const encodedQuery = encodeURIComponent(query);

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedQuery}&inputtype=textquery&fields=place_id,name,formatted_address,rating,user_ratings_total&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      return data.candidates[0];
    }

    console.log(`No place found for: ${businessName}, ${address}`);
    return null;
  } catch (error) {
    console.error(`Error finding place for ${businessName}:`, error);
    return null;
  }
}

/**
 * Fetch Google reviews for a Place ID
 */
async function fetchGoogleReviews(placeId: string) {
  if (!API_KEY) {
    throw new Error('GOOGLE_MAPS_KEY not configured');
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      return data.result;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching reviews for ${placeId}:`, error);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Google Place ID bulk update...\n');

  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB\n');

    // Find all active merchants without Google Place ID
    const merchants = await Partner.find({
      status: 'active',
      visibility: true,
      $or: [
        { googlePlaceId: { $exists: false } },
        { googlePlaceId: null },
        { googlePlaceId: '' }
      ]
    }).select('merchantId displayName city streetAddress googlePlaceId');

    console.log(`📊 Found ${merchants.length} merchants without Google Place ID\n`);

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < merchants.length; i++) {
      const merchant = merchants[i];
      console.log(`\n[${i + 1}/${merchants.length}] Processing: ${merchant.displayName}`);
      console.log(`   Address: ${merchant.streetAddress}, ${merchant.city}`);

      // Add delay to avoid rate limiting (1 request per second)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Find Place ID
      const place = await findPlaceId(merchant.displayName, `${merchant.streetAddress}, ${merchant.city}`);

      if (!place) {
        console.log(`   ❌ No place found`);
        failCount++;
        continue;
      }

      console.log(`   ✅ Found Place ID: ${place.place_id}`);
      console.log(`   📍 Address: ${place.formatted_address}`);
      
      if (place.rating) {
        console.log(`   ⭐ Rating: ${place.rating} (${place.user_ratings_total} reviews)`);
      }

      // Fetch full reviews data
      const reviews = await fetchGoogleReviews(place.place_id);

      // Update merchant
      merchant.googlePlaceId = place.place_id;
      
      if (reviews) {
        merchant.googleReviews = {
          rating: reviews.rating || 0,
          userRatingsTotal: reviews.user_ratings_total || 0,
          reviews: reviews.reviews || [],
          lastFetched: new Date(),
        };
        console.log(`   💾 Saved reviews data`);
      }

      await merchant.save();
      console.log(`   ✅ Updated merchant`);
      successCount++;
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the script
main();