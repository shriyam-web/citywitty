# SEO Optimization for Merchant Pages

## High Priority Issues

### 1. Client-Side Rendering Impact
- [ ] Convert `MerchantHero.tsx` from client component to server component
- [ ] Move static content from `OfflineDiscountsSection.tsx` to server-side rendering
- [ ] Optimize `BackgroundWatermarkIcons.tsx` for server rendering
- [ ] Reduce hydration delays by minimizing client-side JavaScript

### 2. Image Optimization and Alt Text
- [ ] Add descriptive alt text to all store images in `MerchantHero.tsx`
- [ ] Implement proper alt text for product images in `OfflineProductsGrid`
- [ ] Add `aria-hidden` to decorative background icons
- [ ] Implement lazy loading for below-the-fold images
- [ ] Add `priority` prop to above-the-fold hero images

## Medium Priority Issues

### 3. Heading Hierarchy and Semantic Structure
- [ ] Ensure single h1 per page in merchant pages
- [ ] Implement proper h2-h6 hierarchy throughout components
- [ ] Add semantic landmarks (main, section, article) to page structure
- [ ] Improve screen reader navigation with proper headings

### 4. Content and Keyword Optimization
- [ ] Add internal links to related merchants in `SuggestedMerchantsNearYou`
- [ ] Enhance offer descriptions with relevant keywords
- [ ] Add Product schema markup for offline products
- [ ] Implement Offer schema for discount sections
- [ ] Optimize meta descriptions for better CTR

### 5. Performance and Core Web Vitals
- [ ] Implement image preloading for critical hero images
- [ ] Optimize component loading order in main page
- [ ] Reduce layout shift from dynamic content
- [ ] Minimize render-blocking resources

## Low Priority Issues

### 6. Accessibility and User Experience
- [ ] Add ARIA labels to interactive elements in `MerchantHero.tsx`
- [ ] Improve keyboard navigation in gallery modals
- [ ] Enhance focus management in `OfflinePurchaseModal.tsx`
- [ ] Add proper link relationships in `ContactInformation.tsx`
- [ ] Improve color contrast for status badges

## Implementation Order

1. **Phase 1: Client-Side Rendering (Week 1)**
   - Convert MerchantHero to server component
   - Optimize OfflineDiscountsSection
   - Server-render BackgroundWatermarkIcons

2. **Phase 2: Image and Content Optimization (Week 2)**
   - Implement comprehensive alt text strategy
   - Add Product and Offer schemas
   - Optimize meta descriptions

3. **Phase 3: Performance and Accessibility (Week 3)**
   - Core Web Vitals improvements
   - Accessibility enhancements
   - Final testing and validation

## Testing Checklist

- [ ] Google PageSpeed Insights score > 90
- [ ] Rich Results Test passes for all schemas
- [ ] Schema.org validator clean results
- [ ] Lighthouse accessibility score > 95
- [ ] Mobile-friendly test passes
- [ ] Core Web Vitals all "Good"

## Files to Modify

- `app/merchants/[merchantSlug]/page.tsx`
- `app/merchants/[merchantSlug]/components/MerchantHero.tsx`
- `app/merchants/[merchantSlug]/components/ContactInformation.tsx`
- `app/merchants/[merchantSlug]/components/OfflineDiscountsSection.tsx`
- `app/merchants/[merchantSlug]/components/BackgroundWatermarkIcons.tsx`
- `app/merchants/[merchantSlug]/seo-helpers.ts`
- `app/merchants/[merchantSlug]/merchant-structured-data.tsx`
