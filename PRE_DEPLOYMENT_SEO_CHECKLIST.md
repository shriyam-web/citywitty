# 🚀 Pre-Deployment SEO Checklist

Complete this checklist before deploying merchant pages to production.

---

## ✅ Code Review (30 minutes)

### Page Component
- [ ] `app/merchants/[merchantSlug]/page.tsx` has enhanced metadata generation
- [ ] BreadcrumbNavigation imported and used
- [ ] ISR revalidation set to 3600 seconds
- [ ] Static params generation includes premium + recent merchants
- [ ] generateMetadata includes keywords, lastModified, robots directives

### Breadcrumb Component
- [ ] `components/BreadcrumbNavigation.tsx` created
- [ ] Uses semantic nav with aria-label
- [ ] Links include proper href attributes
- [ ] Exported in components/index.ts

### Sitemap Route
- [ ] `app/sitemap.xml/route.ts` created
- [ ] Fetches all active merchants
- [ ] Sets proper Cache-Control headers
- [ ] Includes priority and lastmod
- [ ] Returns valid XML

### Structured Data
- [ ] `seo-helpers.ts` includes LocalBusiness enhancements
- [ ] WebSite schema added
- [ ] Organization schema updated with contactPoint
- [ ] All schemas properly export functions
- [ ] `merchant-structured-data.tsx` imports new schemas

### Robots.txt
- [ ] `public/robots.txt` created
- [ ] Allows `/merchants/*` paths
- [ ] Disallows `/admin`, `/dashboard/admin`, `/api/`
- [ ] Includes sitemap references
- [ ] Bot-specific rules for Google/Bing

---

## 🔧 Environment Setup (15 minutes)

- [ ] `NEXT_PUBLIC_APP_URL` environment variable set correctly
  ```
  Expected format: https://citywitty.com (no trailing slash)
  ```

- [ ] MongoDB connection string configured
  ```
  Required for generateStaticParams and getMerchantData
  ```

- [ ] Build environment has sufficient memory
  ```
  Note: 200 merchant pages pre-generated during build
  Recommendation: 2GB+ RAM
  ```

---

## 🧪 Local Testing (45 minutes)

### Build Verification
```bash
# Run build and check for errors
npm run build

# Expected output:
# ✅ Compiles without errors
# ✅ No TypeScript errors
# ✅ No ESLint warnings
# ✅ Static pages generated successfully
```

### Sitemap Generation
```bash
# Test local sitemap
curl http://localhost:3000/sitemap.xml

# Verify:
# ✅ Returns valid XML
# ✅ Contains merchant URLs
# ✅ Includes priority values
# ✅ Includes lastmod dates
```

### Merchant Page Check
```bash
# Check a merchant page renders
npm run dev

# Visit in browser:
# http://localhost:3000/merchants/[some-merchant-slug]

# Verify:
# ✅ Page loads without errors
# ✅ Breadcrumbs visible
# ✅ All sections render
# ✅ Images load correctly
# ✅ No console errors
```

### Metadata Verification
```bash
# Open browser DevTools (F12)
# Go to merchant page
# Right-click → View Page Source

# Check for:
# ✅ <title> with merchant name, category, city
# ✅ <meta name="description"> unique and keyword-rich
# ✅ <meta name="keywords"> present
# ✅ <meta property="og:*"> tags present
# ✅ <script type="application/ld+json"> multiple schemas
# ✅ Breadcrumb navigation HTML present
```

### Schema Validation
```bash
# Open browser DevTools
# Go to merchant page
# Right-click → View Page Source
# Search for "ld+json"

# Verify at: https://search.google.com/test/rich-results

# Expected schemas:
# ✅ LocalBusiness
# ✅ Organization
# ✅ BreadcrumbList
# ✅ WebSite
# ✅ Review (if ratings exist)
# ✅ FAQs (if FAQs exist)
# ✅ Products (if products exist)
```

---

## 📊 Data Verification (30 minutes)

### Merchant Data Quality
```bash
# Check MongoDB for merchants with required fields
db.partners.find({
  status: 'active',
  merchantSlug: { $exists: true }
}).limit(5)

# Verify:
# ✅ merchantSlug is unique and URL-safe
# ✅ displayName is present
# ✅ category is populated
# ✅ city is populated
# ✅ At least one image (storeImages or logo)
```

### Verify ISR Works
- [ ] Merchant has `updatedAt` field (for Last-Modified)
- [ ] Some merchants are marked as `verified`, `premiumSeller`, or `topRated`
- [ ] Reviews/ratings exist for top merchants

---

## 🚀 Pre-Production Staging (30 minutes)

### Deploy to Staging
```bash
# Deploy to staging environment
# Verify same as production config
```

### Sitemap Check
```bash
# Test staging sitemap
curl https://staging.citywitty.com/sitemap.xml

# Verify:
# ✅ Contains merchant URLs
# ✅ All URLs use https
# ✅ Proper XML format
# ✅ Loads in <2 seconds
```

### Robots.txt Check
```bash
# Verify robots.txt accessible
curl -I https://staging.citywitty.com/robots.txt

# Verify:
# ✅ HTTP 200 status
# ✅ Content-Type: text/plain
# ✅ No redirects
```

### Page Load Test
```bash
# Test 5 random merchant pages
# Use: https://pagespeed.web.dev/

# Verify:
# ✅ Mobile score >80
# ✅ Desktop score >85
# ✅ Core Web Vitals: All green
# ✅ No critical errors
```

---

## 🔐 Security Check (15 minutes)

- [ ] No API keys exposed in frontend code
- [ ] No sensitive data in metadata
- [ ] robots.txt properly restricts admin areas
- [ ] HTTPS enforced on all pages
- [ ] CSP headers properly set

---

## 📋 Production Deployment (1 hour)

### Final Checklist
- [ ] Code reviewed and approved
- [ ] Tests passed locally
- [ ] Staging verification complete
- [ ] Database backups current
- [ ] Deployment plan documented

### Deployment Steps
1. [ ] Deploy code to production
2. [ ] Clear CDN/cache if applicable
3. [ ] Verify site loads without errors
4. [ ] Test 10 random merchant pages
5. [ ] Monitor error logs for 30 minutes

### Post-Deployment
```bash
# Verify production sitemap
curl https://citywitty.com/sitemap.xml

# Verify robots.txt
curl -I https://citywitty.com/robots.txt

# Test merchant pages load
curl -I https://citywitty.com/merchants/[slug]
```

---

## 🔍 Google Search Console Setup (1 hour)

### Step 1: Verify Property
- [ ] Domain verified in GSC (DNS or HTML file method)
- [ ] Choose preferred domain (with or without www)

### Step 2: Submit Sitemap
```
1. Go to: https://search.google.com/search-console
2. Select property: citywitty.com
3. Go to: Sitemaps section
4. Click: Add/Test sitemap
5. Enter: https://citywitty.com/sitemap.xml
6. Click: Submit
```

- [ ] Sitemap submission confirmed
- [ ] No errors shown in GSC

### Step 3: Request Indexing
```
1. Go to: URL Inspection tool
2. Enter: https://citywitty.com/merchants/[top-merchant-slug]
3. Click: Request Indexing
4. Repeat for 5-10 top merchants
```

- [ ] Indexing requests submitted

### Step 4: Monitor Coverage
- [ ] Go to Coverage report
- [ ] Should show 0 errors initially (may take days)
- [ ] Check back daily for indexed count increase

---

## ✨ Quality Assurance (30 minutes)

### Desktop Browser Testing
- [ ] Chrome - Page loads, all elements render
- [ ] Firefox - Page loads, all elements render
- [ ] Safari - Page loads, all elements render
- [ ] Edge - Page loads, all elements render

### Mobile Testing
- [ ] iPhone (Safari) - Responsive, touch-friendly
- [ ] Android (Chrome) - Responsive, touch-friendly
- [ ] Tablet - Responsive layout

### Functionality Testing
- [ ] Breadcrumbs clickable
- [ ] All links work
- [ ] Images load
- [ ] Forms submit (if any)
- [ ] No console errors

### SEO Testing
- [ ] Title visible in browser tab
- [ ] Breadcrumbs display correctly
- [ ] Rich snippets showing in GSC
- [ ] Mobile-friendly confirmed

---

## 📈 Success Metrics to Track

### Day 1
- [ ] No 500 errors in logs
- [ ] Sitemap generates successfully
- [ ] Pages load under 3 seconds
- [ ] Mobile score >80

### Day 1-7
- [ ] Sitemap submitted to GSC
- [ ] First merchant pages indexed (check GSC)
- [ ] No crawl errors in GSC

### Week 2
- [ ] 50+ merchant pages indexed
- [ ] Pages appearing in search results
- [ ] Rich results displaying

### Month 1
- [ ] 300+ merchant pages indexed
- [ ] Consistent search impressions
- [ ] First clicks from search appearing

---

## 🐛 Rollback Plan

If issues occur, be prepared to:

1. **Immediate Rollback**
   ```bash
   # Revert to previous deployment
   git revert [commit-hash]
   npm run build
   npm run deploy
   ```

2. **Temporary Workarounds**
   - Disable ISR (set to false if needed)
   - Remove breadcrumbs if causing issues
   - Simplify metadata if causing errors

3. **Investigation Path**
   - Check error logs
   - Test locally with same data
   - Check MongoDB connectivity
   - Verify environment variables

---

## 📞 Support Resources

### If You Encounter Issues

**Issue**: Sitemap returns 500 error
- Solution: Check MongoDB connection string
- Solution: Verify Partner model is importable
- Solution: Check server logs for specific error

**Issue**: Pages not indexed after 1 week
- Solution: Verify robots.txt allows /merchants/*
- Solution: Check GSC Coverage for errors
- Solution: Manually request indexing in GSC

**Issue**: Low page speed scores
- Solution: Enable image optimization
- Solution: Check for memory issues
- Solution: Reduce ISR frequency if overloaded

**Issue**: Rich results not showing
- Solution: Run through Rich Results Test
- Solution: Fix schema validation errors
- Solution: Ensure all fields populated
- Solution: Wait 1-2 weeks for recrawl

---

## ✅ Sign-Off Checklist

Before going live, ensure:

```
☐ Code review completed and approved
☐ All tests passing locally
☐ Staging environment verified
☐ Security audit completed
☐ Performance benchmarks met
☐ Backup created
☐ Deployment plan finalized
☐ Monitoring setup ready
☐ Documentation reviewed
☐ GSC setup ready

READY TO DEPLOY? [YES / NO]
```

---

## 📞 Emergency Contact

If issues arise after deployment:
1. Check error logs immediately
2. Monitor GSC for crawl errors
3. Test pages manually
4. Rollback if necessary
5. Investigate in staging
6. Redeploy fix

---

**Deployment Status**: Ready for Production ✅

**Estimated Time to Full SEO Impact**: 30-90 days

**Expected Merchant Pages Ranking**: 80%+ within 6 months

---

**Good luck! 🚀**

Once deployed, follow the `SEO_MONITORING_CHECKLIST.md` for ongoing monitoring.