# Merchant Page SEO Implementation Guide

## Overview
This document describes the comprehensive SEO optimizations implemented for the merchant profile pages (`/merchants/[merchantSlug]`). These optimizations are critical for merchant visibility in search results and social media sharing.

---

## 1. Dynamic Meta Tags (Server-Side)

### File: `layout.tsx`

The `generateMetadata` function creates dynamic meta tags for each merchant page:

#### Meta Tags Generated:
- **Title**: `{displayName} - {category} in {city} | CityWitty` (with badges like "Top Rated", "Verified")
- **Description**: Compelling 160-character description including name, category, city, rating, deals count, and snippet of merchant description
- **Keywords**: Merchant name, category, city, "local business", and custom tags
- **Canonical URL**: Prevents duplicate content issues
- **Robots Directives**: `index, follow` (or `noindex, nofollow` if merchant not found)
- **Viewport**: Mobile-responsive settings

#### Example Meta Tags Output:
```html
<title>Delhi Coffee House - Cafe in Delhi | CityWitty | Top Rated</title>
<meta name="description" content="Delhi Coffee House in Delhi - Cafe. 4.8/5 stars (245 reviews). 3 exclusive deals...">
<meta name="keywords" content="Delhi Coffee House, Cafe, Delhi, local business, premium, cozy">
<link rel="canonical" href="https://citywitty.com/merchants/delhi-coffee-house">
```

#### How It Works:
1. The `generateMetadata` function runs server-side
2. It fetches merchant data via the API
3. It generates SEO-optimized meta tags based on merchant information
4. Uses **Incremental Static Regeneration (ISR)** with 1-hour revalidation for performance

---

## 2. Open Graph & Twitter Card Tags

### Purpose
Improves how merchant pages appear when shared on social media (Facebook, WhatsApp, LinkedIn, Twitter, etc.)

### Generated Tags:

**Open Graph (Facebook, LinkedIn, WhatsApp):**
```html
<meta property="og:type" content="business.business">
<meta property="og:title" content="{merchantTitle}">
<meta property="og:description" content="{merchantDescription}">
<meta property="og:url" content="https://citywitty.com/merchants/[slug]">
<meta property="og:image" content="{merchantImage}">
<meta property="og:site_name" content="CityWitty">
<meta property="og:locale" content="en_IN">
```

**Twitter Card (X/Twitter):**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{merchantTitle}">
<meta name="twitter:description" content="{merchantDescription}">
<meta name="twitter:image" content="{merchantImage}">
<meta name="twitter:creator" content="@CityWitty">
```

### Benefits:
- Rich preview cards when links are shared
- Higher click-through rates from social platforms
- Better brand visibility and engagement
- Improved social media traffic

---

## 3. JSON-LD Structured Data

### File: `seo-helpers.ts` & `merchant-structured-data.tsx`

Structured data helps Google and other search engines understand merchant information better, improving search visibility and enabling rich snippets.

### Schema Types Implemented:

#### A. LocalBusiness Schema
**Purpose**: Google understands merchant's basic information

**Includes**:
- Business name and description
- Address (street, city, pincode)
- Coordinates (latitude, longitude)
- Phone and email
- Business hours (opening/closing times for each day)
- Website URL
- Ratings and review count
- Active offers and discounts

**Search Result Enhancement**: 
- Google displays merchant info directly in search results
- Shows ratings, hours, and call button
- Improves local search visibility

#### B. Organization Schema
**Purpose**: Establishes CityWitty brand identity

**Includes**:
- Organization name (CityWitty)
- Website
- Logo
- Social media profiles
- Organization description

#### C. BreadcrumbList Schema
**Purpose**: Shows navigation path in search results

**Example Display**:
```
Home > Merchants > Delhi Coffee House
```

**SEO Benefits**:
- Improves SERP appearance
- Better user navigation clarity
- Helps search engines understand site structure

#### D. FAQPage Schema
**Purpose**: If merchant has FAQs, they appear in rich snippets

**Example Display**:
```
Question: What are your operating hours?
Answer: 6 AM - 10 PM daily
```

#### E. Product Schema
**Purpose**: For merchants with products/deals

**Includes**:
- Product name and description
- Brand
- Price (original and discounted)
- Stock availability
- Badges (Bestseller, CityWitty Assured)

---

## 4. Semantic HTML Best Practices

### Current Implementation:

✅ **Proper Heading Hierarchy**:
```html
<h1>{merchant.displayName}</h1>  <!-- Main merchant name -->
<h2>Business Hours</h2>           <!-- Section headers -->
<h2>Payment Methods</h2>
```

✅ **Alt Text for Images**:
```html
<img src={merchantLogo} alt="{merchant.displayName}" />
<img src={galleryImage} alt="{merchant.displayName} storefront" />
```

✅ **Semantic Elements**:
- `<Card>` for grouped content sections
- `<Badge>` for category/status indicators
- `<Button>` with proper ARIA labels

---

## 5. Performance Optimizations for SEO

### ISR (Incremental Static Regeneration)
- **Revalidation**: Every 1 hour (3600 seconds)
- **Benefit**: Pages are pre-rendered at build time, then revalidated
- **Result**: Fast page load + fresh content

### Static Parameters Generation
- Pre-generates popular merchant pages at build time
- `generateStaticParams()` fetches top merchants from API
- Improves build performance and reduces first load time

### Image Optimization
- Already has alt text
- Consider lazy loading with Next.js `<Image>` component for future improvements

---

## 6. Mobile SEO

### Current Features:
✅ Responsive viewport meta tag
✅ Mobile-first Tailwind CSS design
✅ Touch-friendly buttons and interactions
✅ Proper heading sizes for mobile readability

### Recommended Future Improvements:
- Implement Core Web Vitals monitoring
- Optimize image sizes with Next.js Image component
- Consider mobile-specific structured data

---

## 7. Local SEO Optimization

### Location-Based Features:
1. **Merchant Address**: Full street address, city, pincode
2. **Business Hours**: Daily opening/closing times
3. **Coordinates**: Latitude/longitude for Google Maps integration
4. **Branch Locations**: Multiple locations support with maps
5. **Phone/Email**: Direct contact options

### Best Practices Implemented:
✅ Consistent NAP (Name, Address, Phone)
✅ Local business schema with coordinates
✅ Multiple location support
✅ Business hours specification

---

## 8. Monitoring & Validation

### How to Verify SEO Implementation:

#### 1. **Google Search Console**
- Check indexed pages
- Monitor click-through rates (CTR)
- Fix any crawl errors

#### 2. **Structured Data Testing**
Visit: https://search.google.com/test/rich-results
- Paste merchant page URL
- Verify LocalBusiness schema is recognized
- Check for any validation errors

#### 3. **Meta Tag Inspection**
Browser DevTools > Elements:
```html
<!-- Check these are present -->
<title>...</title>
<meta name="description">
<meta property="og:image">
<script type="application/ld+json"> ... </script>
```

#### 4. **Social Media Preview**
- Share merchant URL on Facebook/WhatsApp
- Verify rich preview card displays correctly
- Image, title, and description should be visible

#### 5. **Lighthouse Audit**
Run `npm run build` then audit with Lighthouse:
- SEO score should be 90+
- Mobile score should be 90+

---

## 9. Environment Variables Required

Add to `.env.local`:
```
NEXT_PUBLIC_APP_URL=https://citywitty.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_VERIFICATION_CODE
```

---

## 10. Future Enhancements

### High Priority:
1. **Video Schema**: Add product/merchant videos with VideoObject schema
2. **Review Schema**: Enhanced rating reviews with specific review text
3. **Event Schema**: For store events/promotions
4. **Sitemap**: Dynamic XML sitemap for all merchants

### Medium Priority:
5. **Voice Search Optimization**: FAQ snippets optimization
6. **Mobile App Schema**: App linking for mobile app
7. **AMP Support**: Fast mobile page rendering

### Low Priority:
8. **Hreflang Tags**: Multi-language support
9. **Alternate Links**: Regional variations

---

## 11. SEO Checklist for New Merchants

When a new merchant is added, ensure:

- [ ] Merchant name is descriptive (category + location)
- [ ] Description is 160-200 characters, keyword-rich
- [ ] Logo image is high quality (500x500px minimum)
- [ ] Gallery images have descriptive filenames
- [ ] Business hours are complete and accurate
- [ ] Address includes street, city, and pincode
- [ ] Coordinates (lat/lng) are accurate
- [ ] At least 3 products added with descriptions
- [ ] Contact phone and email are valid
- [ ] Social media links are complete

---

## 12. Testing Checklist

```bash
# Build and test locally
npm run build

# Verify no TypeScript errors
npm run lint

# Check meta tags with browser
npm start

# Test with Google's Rich Results Test
# https://search.google.com/test/rich-results
```

---

## 13. FAQ

**Q: How long does it take for changes to appear in search results?**
A: Google's crawler visits pages regularly. ISR revalidates every hour. Google typically indexes changes within 24-48 hours.

**Q: Why are some merchants not appearing in search results?**
A: Check:
1. Merchant is active and not marked as Inactive
2. No robots noindex directive
3. Merchant has complete information
4. Site not blocked in Google Search Console

**Q: How do we improve merchant rankings?**
A: 
- Encourage user reviews/ratings
- Add more products with descriptions
- Build high-quality backlinks
- Ensure consistent NAP
- Regular content updates

---

## 14. References

- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Schema.org - LocalBusiness](https://schema.org/LocalBusiness)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/layout#metadata)

---

**Last Updated**: 2024
**Status**: ✅ Production Ready