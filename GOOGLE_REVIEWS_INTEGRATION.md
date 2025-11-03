# Google Reviews Integration Guide

## Overview

This feature allows merchants to display their **live Google reviews** (rating and review count) on their public merchant pages automatically.

## Features

✅ Display live Google review count  
✅ Display average Google rating  
✅ Auto-refresh every 12 hours (cached for performance)  
✅ Stays within Google's free tier ($200/month)  
✅ Beautiful Google-branded display  
✅ Built-in Place ID finder tool  

---

## For Merchants: How to Add Google Reviews to Your Page

### Step 1: Find Your Google Place ID

1. **Go to the Place ID Finder tool**: Navigate to `/dashboard/merchant/google-place-finder`
2. **Enter your business name** as it appears on Google Maps
3. **Add your address** (optional but recommended) to narrow results
4. **Click Search**
5. **Copy your Place ID** from the results

### Step 2: Add Place ID to Your Profile

**Option A: Via Dashboard** (Recommended)
- Go to your merchant dashboard
- Navigate to Settings → Google Reviews
- Paste your Place ID
- Click "Save"

**Option B: Via Database** (For Admins)
- Update the `googlePlaceId` field in the merchant document
- The system will automatically fetch reviews on next page load

### Step 3: Verify

- Visit your public merchant page (`/merchants/[your-slug]`)
- You should see a Google Reviews card with your rating and review count
- Reviews are cached for 12 hours to save API costs

---

## For Developers: How It Works

### Database Schema

Added to Partner model (`IPartner` interface):

```typescript
googlePlaceId?: string;
googleReviews?: {
  rating: number;
  userRatingsTotal: number;
  reviews: any[];
  lastFetched: Date;
};
```

### API Endpoints

#### 1. **GET /api/google-reviews**
Fetch Google reviews for a Place ID
```
GET /api/google-reviews?placeId=YOUR_PLACE_ID
```

#### 2. **POST /api/google-reviews/update-merchant**
Update merchant's cached Google reviews
```json
POST /api/google-reviews/update-merchant
{
  "merchantId": "CW-M123456",
  "placeId": "ChIJ...",
  "forceRefresh": false
}
```

#### 3. **GET /api/google-reviews/find-place**
Find Google Place ID by business name
```
GET /api/google-reviews/find-place?name=Business+Name&address=City
```

### Caching Strategy

- Reviews are cached in MongoDB for **12 hours**
- Auto-refresh happens in background when page is loaded
- Does not block page rendering
- Saves API costs (stays within free tier)

### Cost Optimization

With 100 merchants:
- **Without caching**: 10,000+ API calls/month ❌
- **With 12-hour cache**: ~3,000 API calls/month ✅
- **Google free tier**: 11,000 calls/month
- **Result**: 100% FREE! 🎉

---

## API Setup

### Enable Google Places API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create one)
3. Enable **Places API**:
   - Go to APIs & Services → Library
   - Search for "Places API"
   - Click "Enable"

### API Key Configuration

The API key is already configured in `.env.local`:
```
GOOGLE_MAPS_KEY=AIzaSyAk4WI6M2SF31z9EzAvT_W0JmksI9NgDRk
```

**Security**: Restrict this key to:
- Places API
- Your domain (in production)

---

## How Merchants Register with Google Place ID

### Option 1: During Registration
Add a field to the merchant registration form:
```tsx
<Input
  label="Google Place ID (Optional)"
  name="googlePlaceId"
  placeholder="ChIJ..."
  helperText="Find your Place ID at /dashboard/merchant/google-place-finder"
/>
```

### Option 2: After Registration
- Merchants can add/update their Place ID in dashboard settings
- Admins can add it manually via admin panel

---

## Display on Public Page

The merchant page (`/merchants/[merchantSlug]/page.tsx`) automatically:

1. **Checks if merchant has `googlePlaceId`**
2. **Fetches cached reviews** from database
3. **Auto-refreshes if stale** (>12 hours old)
4. **Displays Google Reviews card** with:
   - Google logo and branding
   - Average rating (e.g., 4.5)
   - Total review count (e.g., 1,234 reviews)
   - Star rating visualization
   - "Powered by Google" badge

### Component Structure

```tsx
<GoogleReviewsSection googleReviews={merchant.googleReviews} />
```

---

## Troubleshooting

### "No results found" when searching
- Check business name spelling
- Try adding the city/area name
- Verify business is listed on Google Maps
- Try searching on [Google Maps](https://maps.google.com) first

### Reviews not showing on public page
1. Check if `googlePlaceId` is set in database
2. Check if Place ID is valid (use Place ID Finder)
3. Check API key is configured
4. Check Places API is enabled in Google Cloud
5. Check console for error messages

### API Quota Exceeded
- You're likely making too many requests
- Check caching is working (reviews should be cached 12 hours)
- Reduce cache duration if needed
- Consider upgrading Google Cloud plan

---

## Testing

### Test Place IDs

Use these for testing:
- **Google Sydney Office**: `ChIJN1t_tDeuEmsRUsoyG83frY4`
- **Times Square, NYC**: `ChIJmQJIxlVYwokRLgeuocVOGVU`

### Test API Endpoint

```bash
curl "http://localhost:3000/api/google-reviews?placeId=ChIJN1t_tDeuEmsRUsoyG83frY4"
```

---

## Future Enhancements

- [ ] Display individual reviews (not just count/rating)
- [ ] Review sentiment analysis
- [ ] Auto-respond to reviews
- [ ] Review notifications
- [ ] Competitor review tracking
- [ ] Review widgets for other pages

---

## Support

For issues or questions:
- Check this documentation first
- Check Google Places API docs
- Contact dev team

---

## Credits

- Google Places API
- CityWitty Development Team
- Implemented: 2024