# Bulk Google Place ID Updater

## Purpose

This script helps you automatically find and add Google Place IDs for all your existing merchants who don't have one yet.

## Prerequisites

1. Google Maps API Key configured in `.env.local`
2. Places API enabled in Google Cloud Console
3. MongoDB connection working

## How to Use

### Option 1: Using ts-node (Recommended)

```bash
npx ts-node scripts/update-google-place-ids.ts
```

### Option 2: Using Node (compile first)

```bash
npx tsc scripts/update-google-place-ids.ts
node scripts/update-google-place-ids.js
```

## What It Does

1. **Finds all active merchants** without a Google Place ID
2. **Searches Google Places** for each merchant using their name and address
3. **Fetches review data** (rating, count, reviews)
4. **Updates the database** with Place ID and reviews
5. **Provides a summary** of success/failure

## Features

- ✅ Auto-search by business name + address
- ✅ Fetches and caches reviews immediately
- ✅ Rate limiting (1 request/second to avoid quota issues)
- ✅ Progress tracking
- ✅ Error handling
- ✅ Summary report

## Example Output

```
🚀 Starting Google Place ID bulk update...

✅ Connected to MongoDB

📊 Found 50 merchants without Google Place ID

[1/50] Processing: Cafe Coffee Day
   Address: MG Road, Bangalore
   ✅ Found Place ID: ChIJ...
   📍 Address: Cafe Coffee Day, MG Road, Bangalore...
   ⭐ Rating: 4.2 (1234 reviews)
   💾 Saved reviews data
   ✅ Updated merchant

[2/50] Processing: Pizza Hut
   ...

==================================================
📊 Summary:
   ✅ Success: 45
   ❌ Failed: 5
   ⏭️  Skipped: 0
==================================================
```

## Important Notes

### API Quotas

- This script makes **2 API calls per merchant**:
  1. Find Place (Text Search)
  2. Place Details (to get reviews)

- With 100 merchants = 200 API calls
- Google free tier = 11,000 calls/month
- **You're safe!** ✅

### Rate Limiting

The script includes a 1-second delay between merchants to:
- Avoid overwhelming the API
- Stay within rate limits
- Be a good API citizen

### What If Search Fails?

If the script can't find a merchant:
- Double-check the merchant's name in database matches Google Maps
- Try manually updating via the Place ID Finder tool
- Check the merchant's address is accurate

## Manual Override

If you need to manually add Place IDs for specific merchants:

1. Use the Place ID Finder tool: `/dashboard/merchant/google-place-finder`
2. Update via MongoDB directly:

```javascript
db.partners.updateOne(
  { merchantId: "CW-M123456" },
  { $set: { googlePlaceId: "ChIJ..." } }
)
```

## Troubleshooting

### "GOOGLE_MAPS_KEY not configured"
- Check `.env.local` has `GOOGLE_MAPS_KEY`
- Make sure you're running from project root

### "ZERO_RESULTS" for many merchants
- Check business names in database match Google Maps
- Consider adding more address details
- Some businesses might not be on Google Maps

### Script times out
- Process in smaller batches
- Increase delay between requests
- Check your internet connection

## Cost Estimate

- **100 merchants** = 200 API calls = **FREE** (within $200 credit)
- **500 merchants** = 1,000 API calls = **FREE**
- **5,000 merchants** = 10,000 API calls = **FREE**
- You can process **5,000+ merchants per month** for FREE!

## Re-running the Script

Safe to run multiple times:
- Only processes merchants **without** a Place ID
- Skips merchants that already have one
- No duplicate updates

## Need Help?

Check:
1. This README
2. Main documentation: `GOOGLE_REVIEWS_INTEGRATION.md`
3. Google Places API docs
4. Your Google Cloud Console quota page