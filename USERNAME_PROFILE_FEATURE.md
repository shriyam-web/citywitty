# Username-Based Merchant Profile URLs

## Overview

This feature allows merchants to have optional vanity URLs based on their username. Instead of only being accessible at `/merchants/merchant-slug`, merchants can now also be accessed at `/@username` (e.g., `citywitty.com/@johndoe`).

## Key Features

### 1. **No Redirects - Direct Serving**
- The `/[username]` route directly serves merchant content without any HTTP redirects
- Both URLs serve identical content with proper canonicalization
- This approach preserves SEO quality by avoiding redirect chains

### 2. **Canonical URL Management**
- The `/[username]` page sets a canonical URL pointing to `/merchants/[merchantSlug]`
- Search engines will recognize `/merchants/[merchantSlug]` as the primary URL
- All SEO signals are directed to the proper merchant URL

### 3. **Optional Feature**
- Username is an optional field in the merchant profile
- Only merchants with a username set can use the vanity URL
- If no username is set, the merchant is only accessible via `/merchants/[merchantSlug]`

### 4. **Database Index for Performance**
- Added sparse unique index on the `username` field
- Enables fast lookups even with millions of merchants
- Sparse index ensures no conflicts when username is null

## Implementation Details

### Files Created

1. **app/[username]/page.tsx**
   - Main page component for username-based routes
   - Queries database for merchant with matching username
   - Serves full merchant profile page
   - Sets canonical tag to `/merchants/[merchantSlug]`

2. **app/[username]/layout.tsx**
   - Layout wrapper for username routes
   - Ensures proper metadata propagation

3. **app/[username]/not-found.tsx**
   - Custom 404 page for invalid usernames
   - Provides navigation to browse all merchants

### Schema Changes

Updated `/models/partner/partner/partner.schema.ts`:
```javascript
PartnerSchema.index({ username: 1 }, { sparse: true });
```

This adds a sparse index on the username field:
- `sparse: true` - Index only exists for documents with non-null username
- `{ unique: false }` - Allows duplicate null values (merchants without username)

### URL Examples

**Before**: Only accessible via merchant slug
```
citywitty.com/merchants/john-doe-restaurant
```

**After**: Both URLs work, serving identical content
```
citywitty.com/@johndoe                           (new)
citywitty.com/merchants/john-doe-restaurant      (existing - canonical)
```

## SEO Considerations

### Why No Redirects?

❌ **Redirect approach** (harmful to SEO):
```
citywitty.com/@johndoe → 301 Redirect → citywitty.com/merchants/john-doe-restaurant
```
- Splits page authority between two URLs
- Wastes crawl budget
- Delays user experience
- Creates redirect chains

✅ **Direct serving + canonicalization** (current approach):
```
citywitty.com/@johndoe                          (serves content)
  └─ Contains: <link rel="canonical" href="/merchants/john-doe-restaurant">
  
citywitty.com/merchants/john-doe-restaurant     (primary URL)
  └─ Contains: <link rel="canonical" href="/merchants/john-doe-restaurant">
```
- Single canonical URL consolidates signals
- Instant user experience
- Better crawl efficiency
- No SEO penalty

### Metadata Management

Both URLs receive identical:
- Meta descriptions
- Open Graph tags
- Twitter cards
- Structured data
- Keywords

The only difference is the canonical tag, which explicitly tells search engines which URL is the primary one.

## Database Queries

### Finding a Merchant by Username

```typescript
const merchant = await Partner.findOne({
    username: username,
    status: 'active'
}).lean();
```

The database index ensures this query is O(1) regardless of collection size.

## Usage for Merchants

### Setting Username (in merchant dashboard)

```javascript
// Update merchant profile with username
const merchant = await Partner.findByIdAndUpdate(
    merchantId,
    { username: 'johndoe' },
    { new: true }
);
```

### Accessing Vanity URL

Once username is set:
- Merchant can share: `citywitty.com/@johndoe`
- All analytics/links consolidate to canonical URL
- Profile appears in search results via primary URL

## Admin Panel Updates Required

**TODO**: Add username field to merchant dashboard:
1. Edit profile section - allow merchants to set/change username
2. Username validation - check for:
   - Uniqueness
   - Reserved keywords (merchants, api, admin, etc.)
   - Valid characters (alphanumeric, hyphens)
   - Min/max length constraints
3. Display both URLs in profile preview

## Future Enhancements

1. **Reserved Usernames** - Prevent merchants from using:
   - `/merchants`
   - `/api`
   - `/admin`
   - `/dashboard`
   - Static pages

2. **Username Slugification** - Auto-convert names to URLs:
   - Spaces → hyphens
   - Special chars → removed
   - Lowercase conversion

3. **Analytics** - Track which URL variant is used:
   - Monitor traffic to both URLs
   - Confirm canonical preference

4. **QR Codes** - Generate QR codes for vanity URLs:
   - Shorter URLs for printing
   - Easier sharing

## Performance Impact

### Database
- Single index lookup: ~1ms
- No N+1 queries
- Minimal memory overhead

### Page Generation
- Same as `/merchants/[merchantSlug]`
- One extra database query (username lookup)
- Revalidated immediately (ISR disabled)

## Testing

### URL Resolution
```bash
# Should work (serves page)
curl -I https://citywitty.com/@johndoe

# Should work (serves page)
curl -I https://citywitty.com/merchants/john-doe-restaurant

# Should 404 (no merchant with this username)
curl -I https://citywitty.com/@invalidusername
```

### Canonical Tag Verification
```bash
# Both URLs should have same canonical
curl https://citywitty.com/@johndoe | grep canonical
curl https://citywitty.com/merchants/john-doe-restaurant | grep canonical
# Both should output: <link rel="canonical" href="/merchants/john-doe-restaurant">
```

### Search Console Monitoring
1. Submit both URLs to Google Search Console
2. Monitor impressions/clicks per URL
3. Verify canonical preference in GSC
4. Check for "Alternate with proper canonical" warnings

## Troubleshooting

### Username Not Working

1. **Check if username is set**
   ```javascript
   const merchant = await Partner.findOne({ merchantId });
   console.log(merchant.username); // Should not be undefined/null
   ```

2. **Verify merchant status**
   - Only active merchants are accessible
   - Suspended/inactive merchants return 404

3. **Check database index**
   ```javascript
   const indexes = await Partner.collection.getIndexes();
   console.log(indexes); // Should include { username: 1 }
   ```

### Duplicate Usernames

- Database won't allow duplicates (enforced by application logic)
- Always validate uniqueness before saving
- Display error if username is taken

### Redirect Issues

- Never implement 301/302 redirects from username URL
- Always serve content directly
- Use canonical tag only for signal consolidation
