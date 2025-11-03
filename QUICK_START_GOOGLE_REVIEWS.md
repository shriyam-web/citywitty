# 🚀 Quick Start: Google Reviews Integration

## ⚡ 5-Minute Setup

### Step 1: Enable Google Places API (2 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "APIs & Services" → "Library"
3. Search for "Places API"
4. Click "Enable"

✅ **Done!** Your API key is already configured.

---

### Step 2: Add Place ID to a Merchant (3 minutes)

#### Option A: Using the Finder Tool

1. Navigate to `/dashboard/merchant/google-place-finder`
2. Enter business name (e.g., "Starbucks, Mumbai")
3. Click "Search"
4. Copy the Place ID
5. Update merchant in MongoDB:

```javascript
db.partners.updateOne(
  { merchantSlug: "your-merchant-slug" },
  { $set: { googlePlaceId: "ChIJ_paste_here" } }
)
```

#### Option B: Direct from Google Maps

1. Find business on [Google Maps](https://maps.google.com)
2. Click "Share" → Copy URL
3. Extract Place ID from URL (use helper function)
4. Add to merchant (same as above)

---

### Step 3: Test It! (30 seconds)

Visit: `http://localhost:3000/merchants/your-merchant-slug`

You should see:
- ✅ Google Reviews card
- ✅ Star rating
- ✅ Review count
- ✅ "Powered by Google" badge

---

## 📦 For Bulk Updates (All Merchants)

Run this script to automatically process all merchants:

```bash
npx ts-node scripts/update-google-place-ids.ts
```

This will:
- Find all merchants without Place ID
- Auto-search Google for each
- Update database with Place ID + reviews
- Show progress and summary

**Time:** ~1 second per merchant (100 merchants = ~2 minutes)

---

## 🎯 For Merchant Registration

Add this field to your registration form:

```tsx
<div>
  <Label htmlFor="googlePlaceId">
    Google Place ID (Optional)
    <a href="/dashboard/merchant/google-place-finder" target="_blank">
      Find yours here
    </a>
  </Label>
  <Input
    id="googlePlaceId"
    name="googlePlaceId"
    placeholder="ChIJ..."
  />
</div>
```

---

## 💡 Key Features

| Feature | Status |
|---------|--------|
| Display Google rating | ✅ |
| Display review count | ✅ |
| Auto-refresh (12hrs) | ✅ |
| Place ID finder | ✅ |
| Bulk updater | ✅ |
| Free tier compatible | ✅ |
| Caching | ✅ |

---

## 📊 What Displays on Merchant Page

```
╔════════════════════════════════════════╗
║  🔵 Google Reviews                    ║
║  Real customer reviews from Google    ║
║                                        ║
║  4.5  ⭐⭐⭐⭐⭐  1,234 reviews      ║
║                                        ║
║  Based on 1,234 Google reviews        ║
║  • Verified Reviews                   ║
║                                        ║
║  Powered by Google 🔵                 ║
╚════════════════════════════════════════╝
```

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| No reviews showing | Check if `googlePlaceId` is set in DB |
| "API not enabled" error | Enable Places API in Google Cloud |
| "Place not found" | Verify business name matches Google Maps |
| Quota exceeded | Check usage in Google Cloud Console |

---

## 📞 API Endpoints

```bash
# Find Place ID
GET /api/google-reviews/find-place?name=Business&address=City

# Get Reviews
GET /api/google-reviews?placeId=ChIJ...

# Update Merchant
POST /api/google-reviews/update-merchant
Body: { merchantId, placeId, forceRefresh }
```

---

## 💰 Pricing

- **Free Tier:** $200/month = ~11,000 requests
- **With Caching:** 100-500 merchants = **$0/month**
- **Without Caching:** Would exceed free tier ❌
- **Our Implementation:** ✅ Uses caching = FREE!

---

## 📚 Full Documentation

- **Complete Guide:** `GOOGLE_REVIEWS_INTEGRATION.md`
- **Implementation Details:** `IMPLEMENTATION_SUMMARY.md`
- **Script Guide:** `scripts/README-GOOGLE-PLACE-IDS.md`

---

## ✅ Checklist

- [ ] Places API enabled in Google Cloud
- [ ] Tested Place ID finder tool
- [ ] Added Place ID to at least one merchant
- [ ] Verified reviews show on merchant page
- [ ] (Optional) Added field to registration form
- [ ] (Optional) Ran bulk update script
- [ ] Monitored API usage

---

## 🎉 You're Done!

Your merchants now have live Google reviews on their pages!

**Next:** Run the bulk script to update all existing merchants.

```bash
npx ts-node scripts/update-google-place-ids.ts
```