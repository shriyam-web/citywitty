# Username Profile URLs - Implementation Guide

## For Merchants

### How to Get Your Vanity URL

1. **Log into Merchant Dashboard**
   - Navigate to Account Settings or Profile Settings

2. **Set Your Username**
   - Go to the Username section
   - Choose a memorable username (3-30 characters)
   - Use lowercase letters, numbers, hyphens, and underscores only
   - Click "Check Availability" to verify it's not taken
   - Save your username

3. **Start Using Your Vanity URL**
   - Your profile is now accessible at: `citywitty.com/@yourusername`
   - Share this shorter URL with customers
   - Include it in your social media bios
   - Use it in print marketing

### Username Rules

✅ **Allowed**
- `john-doe` (hyphens)
- `john_doe` (underscores)
- `johndoe123` (numbers)
- `john` (3-30 characters)

❌ **Not Allowed**
- `jo` (too short - must be 3+ characters)
- `john doe` (spaces not allowed)
- `JOHN` (must be lowercase)
- `john!` (special characters not allowed)
- `merchants` (reserved word)

### Benefits

1. **Shorter URLs** - Easy to remember and share
   - Before: `citywitty.com/merchants/john-doe-restaurant-in-downtown`
   - After: `citywitty.com/@johndoe`

2. **Professional** - Matches modern social media style
   - Similar to Twitter, Instagram, TikTok handles

3. **Better for Marketing** - Print on business cards, menus, packaging
   - Easier to type
   - More memorable
   - Better fit in printed materials

4. **Unchanged Analytics** - All traffic counts the same
   - Links consolidate to your primary URL
   - Google Search Console shows one canonical URL
   - No split in analytics

---

## For Developers

### Integration Checklist

- [ ] Merchant dashboard username field implemented
- [ ] Username availability checker integrated
- [ ] Username update API calls working
- [ ] Vanity URLs displaying in profile preview
- [ ] User notifications for success/error states
- [ ] Database migration run (if needed)
- [ ] SEO validation completed

### Frontend Integration Example

#### 1. Add Username Input Component

```typescript
import { useUsernameManagement } from '@/hooks/use-username-management';
import { useState } from 'react';

export function UsernameSettings() {
  const [username, setUsername] = useState('');
  const [merchantId] = useState(merchantId);
  const { isChecking, isUpdating, checkResult, checkAvailability, updateUsername } = 
    useUsernameManagement();

  const handleCheck = async () => {
    const result = await checkAvailability(username);
    if (result.available) {
      // Show "Available" message
    }
  };

  const handleUpdate = async () => {
    const result = await updateUsername(username, merchantId);
    if (result.success) {
      console.log('Vanity URL:', result.vanityUrl);
    }
  };

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleCheck} disabled={isChecking}>
        {isChecking ? 'Checking...' : 'Check Availability'}
      </button>
      {checkResult && (
        <p>{checkResult.available ? '✓ Available' : `✗ ${checkResult.reason}`}</p>
      )}
      <button onClick={handleUpdate} disabled={isUpdating || !checkResult?.available}>
        {isUpdating ? 'Saving...' : 'Save Username'}
      </button>
    </div>
  );
}
```

#### 2. Display Vanity URL in Profile Preview

```typescript
export function MerchantProfilePreview({ merchant }: { merchant: Merchant }) {
  const vanityUrl = merchant.username 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/@${merchant.username}`
    : null;

  return (
    <div>
      <h3>Your Profile URLs</h3>
      
      {/* Always available */}
      <div>
        <label>Primary URL</label>
        <input readOnly value={`/merchants/${merchant.merchantSlug}`} />
      </div>

      {/* Optional vanity URL */}
      {vanityUrl && (
        <div>
          <label>Vanity URL</label>
          <input readOnly value={vanityUrl} />
          <button onClick={() => window.open(vanityUrl)}>
            Preview Profile
          </button>
        </div>
      )}

      {/* CTA to set username if not set */}
      {!vanityUrl && (
        <button onClick={() => openUsernameModal()}>
          Set Vanity URL
        </button>
      )}
    </div>
  );
}
```

### API Endpoints

#### Check Username Availability

**GET** `/api/merchants/username?username=johndoe`

**Response (Available)**
```json
{
  "available": true,
  "username": "johndoe"
}
```

**Response (Not Available)**
```json
{
  "available": false,
  "reason": "Username is already taken"
}
```

#### Update Username

**POST** `/api/merchants/username`

**Request**
```json
{
  "username": "johndoe",
  "merchantId": "merchant_123"
}
```

**Response (Success)**
```json
{
  "success": true,
  "username": "johndoe",
  "merchantSlug": "john-doe-restaurant",
  "vanityUrl": "https://citywitty.com/@johndoe",
  "canonicalUrl": "https://citywitty.com/merchants/john-doe-restaurant"
}
```

**Response (Error)**
```json
{
  "error": "This username is already taken",
  "success": false
}
```

### Database Considerations

#### Index Status
```javascript
// The index exists on production
const indexes = await Partner.collection.getIndexes();
// Should include: { username: 1 }
```

#### Sparse Index Benefits
- Only non-null usernames are indexed
- No index bloat from null values
- Merchants without username don't occupy index space
- Enables optional feature without performance penalty

### SEO Checklist

- [ ] Canonical tag correctly points to `/merchants/[merchantSlug]`
- [ ] Both URLs return 200 status code
- [ ] No meta robots: noindex on either URL
- [ ] Structured data is identical on both URLs
- [ ] Open Graph metadata matches on both URLs
- [ ] XML sitemap includes only canonical URLs
- [ ] Search Console shows only canonical URLs in GSC
- [ ] Robots.txt allows both URLs

### Monitoring & Validation

#### 1. Check Canonical Tags

```bash
# Verify canonical URL is set correctly
curl https://citywitty.com/@johndoe | grep canonical
curl https://citywitty.com/merchants/john-doe-restaurant | grep canonical
# Both should output the same canonical URL
```

#### 2. Monitor Google Search Console

1. Submit both URLs to GSC
2. Check Preferred domain setting
3. Monitor "Alternate with proper canonical" section
4. Verify clickthrough rates consolidate over time

#### 3. Database Validation

```javascript
// Check for duplicate usernames (should be 0)
const duplicates = await Partner.aggregate([
  { $match: { username: { $ne: null } } },
  { $group: { _id: '$username', count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
]);
console.log('Duplicate usernames:', duplicates.length);

// Check index performance
const stats = await Partner.collection.stats();
console.log('Index stats:', stats.indexSizes);
```

### Common Issues & Solutions

#### Issue: Username URL returns 404

**Check:**
1. Username is set: `merchant.username` is not null
2. Merchant status is active: `merchant.status === 'active'`
3. Database index exists: check MongoDB indexes

#### Issue: Canonical URL not appearing

**Check:**
1. Merchant exists with merchantSlug
2. `generateMetadata` function is being called
3. No custom code overriding canonical tag

#### Issue: Username not visible in profile

**Check:**
1. Username was actually saved to database
2. Page is not using stale cache
3. Clear browser cache with Ctrl+Shift+Del

#### Issue: Duplicate usernames exist

**Fix:**
1. Identify duplicates via aggregation query
2. Manually update one to unique value
3. Verify API validation is working
4. Check application code for bulk operations

### Future Roadmap

1. **Username Suggestions** - Auto-generate from merchant name
2. **Username History** - Track previous usernames, show redirects info
3. **Username Analytics** - Track click-through by URL variant
4. **Social Integration** - Sync username with social media handles
5. **QR Code Generation** - Generate QR codes for vanity URLs

### Support & Questions

For issues or questions about the username feature:
1. Check logs for database errors
2. Verify database connectivity
3. Confirm API endpoints are working
4. Review SEO validation steps above
5. Contact development team with logs
