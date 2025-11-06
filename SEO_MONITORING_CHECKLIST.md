# SEO Monitoring & Verification Checklist

## Immediate Actions (First 24 Hours)

### Step 1: Verify Sitemap
```bash
# Check sitemap is accessible
curl https://citywitty.com/sitemap.xml

# Should return XML with merchant URLs with proper:
# - lastmod dates
# - priority values (0.9 for premium, 0.7 for regular)
# - changefreq (weekly/monthly)
```

### Step 2: Test Rich Results
1. Visit: `https://search.google.com/test/rich-results`
2. Enter: `https://citywitty.com/merchants/[any-merchant-slug]`
3. Click "Inspect"
4. Verify these appear:
   - ✅ LocalBusiness
   - ✅ BreadcrumbList
   - ✅ Organization
   - ✅ Review (if ratings exist)
   - ✅ FAQ (if faqs exist)
   - ✅ Product (if products exist)

### Step 3: Check Mobile Friendliness
1. Visit: `https://search.google.com/mobile-friendly-test/`
2. Enter: `https://citywitty.com/merchants/[any-merchant-slug]`
3. Should show: **"Page is mobile friendly"**

### Step 4: Check Page Speed
1. Visit: `https://pagespeed.web.dev/`
2. Enter: `https://citywitty.com/merchants/[any-merchant-slug]`
3. Target scores:
   - Lighthouse: 80+ (mobile), 85+ (desktop)
   - Core Web Vitals: All green

---

## Google Search Console Setup

### Task 1: Add Property
1. Go to `https://search.google.com/search-console`
2. Click "Add property"
3. Enter: `https://citywitty.com`
4. Verify with DNS TXT record or HTML tag

### Task 2: Submit Sitemap
1. In GSC, go to "Sitemaps"
2. Click "Add/Test sitemap"
3. Enter: `https://citywitty.com/sitemap.xml`
4. Monitor status (should show Submitted and Indexed count)

### Task 3: Monitor Indexing
1. Go to "Coverage" report
2. Check:
   - Valid pages (should increase over time)
   - Excluded pages (non-essential)
   - Errors (should be 0)
   - Warnings (investigate if any)

### Task 4: Monitor Performance
1. Go to "Performance" tab
2. Track:
   - Total impressions (merchants appearing in search)
   - Click-through rate (CTR)
   - Average position (should trend down = better)
   - Impressions by country (should be India-heavy)

### Task 5: Check Mobile Usability
1. Go to "Mobile Usability"
2. Ensure: **"No issues detected"**
3. If issues found:
   - Fix viewport settings
   - Ensure touch-friendly elements
   - Test responsiveness

---

## Monitoring Dashboard Setup

### Key Metrics to Track Daily/Weekly

#### Indexing Health
```
Week 1: Expect 50-100 pages indexed
Week 2: Expect 100-200 pages indexed
Week 3: Expect 200-300 pages indexed
Month 1: Expect 300-500+ pages indexed
```

#### SERP Performance
| Metric | Target | Check |
|--------|--------|-------|
| Avg Position (all keywords) | <10 | GSC Performance |
| CTR | >5% | GSC Performance |
| Impressions | +50/week | GSC Performance |
| Queries generating impressions | 100+ | GSC Queries |

#### Search Query Examples (Monitor These)
1. `[Merchant Name]` - Should rank #1
2. `[Merchant Name] [City]` - Should rank #1-3
3. `[Category] in [City]` - Should rank #5-10
4. `best [category] in [city]` - Should rank #3-10
5. `[Merchant Name] reviews` - Should rank #1-3

---

## Weekly Monitoring Tasks

### Monday: Indexation Report
1. Check GSC Coverage report
2. Verify indexed count is increasing
3. Note any errors appeared

### Wednesday: Performance Review
1. Check GSC Performance tab
2. Compare vs. last week:
   - Impressions +10%?
   - CTR maintained >5%?
   - Avg position improved?

### Friday: Manual Spot Checks
1. Search for 5 random merchants on Google
2. Should see them ranking in top 10 for their name + city
3. Check rich results display
4. Verify breadcrumbs visible

---

## Monthly SEO Audit

### Technical Audit
- [ ] All merchant pages render without errors
- [ ] Sitemap generates successfully
- [ ] robots.txt is accessible
- [ ] No 404 errors in GSC
- [ ] Mobile usability: No issues

### Content Audit
- [ ] Meta descriptions are unique
- [ ] Titles follow pattern: `[Name] - [Category] in [City]`
- [ ] H1 tags are present and unique
- [ ] Image alt text is descriptive
- [ ] Internal links are working

### Structured Data Audit
- [ ] LocalBusiness schema valid
- [ ] BreadcrumbList schema valid
- [ ] Organization schema valid
- [ ] Review schema valid (when applicable)
- [ ] All required fields populated

### Performance Audit
- [ ] Page load time <3s
- [ ] Mobile speed score >80
- [ ] Desktop speed score >85
- [ ] Core Web Vitals: All green
- [ ] No critical errors in GSC

---

## Troubleshooting Common Issues

### Issue: Pages Not Indexed
**Possible Causes:**
- Robots.txt blocking
- noindex tag present
- Duplicate content
- Poor crawl quality

**Solutions:**
1. Check robots.txt allows `/merchants/*`
2. Verify metadata robots: `index, follow`
3. Check canonical tags
4. Submit sitemap in GSC
5. Request manual indexing

### Issue: Low CTR in Search Results
**Possible Causes:**
- Poor title/description
- Not appearing for right keywords
- Competitors ranking higher

**Solutions:**
1. Review top search queries in GSC
2. Optimize title/description for CTR
3. Add more internal links
4. Improve content quality

### Issue: Rich Results Not Showing
**Possible Causes:**
- Invalid schema markup
- Missing required fields
- Content not matching schema

**Solutions:**
1. Run through Rich Results Test
2. Fix any validation errors
3. Ensure fields populated
4. Wait 1-2 weeks for update

### Issue: Mobile Usability Errors
**Possible Causes:**
- Viewport settings wrong
- Touch elements too small
- Interstitials blocking content

**Solutions:**
1. Check viewport meta tag
2. Ensure minimum 48px touch targets
3. Remove intrusive interstitials

---

## KPIs & Success Metrics

### 30-Day Goals
- ✅ 100+ merchant pages indexed
- ✅ 50+ unique search keywords appearing
- ✅ 500+ impressions in GSC
- ✅ 25+ clicks from search

### 90-Day Goals
- ✅ 300+ merchant pages indexed
- ✅ 200+ unique search keywords appearing
- ✅ 5,000+ impressions in GSC
- ✅ 250+ clicks from search
- ✅ Average position <10 for brand searches

### 6-Month Goals
- ✅ 500+ merchant pages indexed
- ✅ 1,000+ unique search keywords appearing
- ✅ 20,000+ impressions in GSC
- ✅ 1,000+ clicks from search
- ✅ Average position <5 for targeted keywords

---

## Tools & Resources

### Essential Tools
1. **Google Search Console** - Primary monitoring
   - URL: `https://search.google.com/search-console`
   
2. **Google PageSpeed Insights** - Performance
   - URL: `https://pagespeed.web.dev/`
   
3. **Rich Results Test** - Schema validation
   - URL: `https://search.google.com/test/rich-results`
   
4. **Mobile-Friendly Test** - Mobile SEO
   - URL: `https://search.google.com/mobile-friendly-test/`

### Optional Enhanced Tools
- Ahrefs (competitor analysis, backlink tracking)
- SEMrush (keyword research, rank tracking)
- Moz Pro (SERP rank tracking)
- Screaming Frog (technical audit)

---

## Template: Weekly SEO Report

```
WEEK OF: [DATE]

📊 INDEXATION
- Pages Indexed: [X]
- % of Target: [X%]
- New Pages Indexed: [+X]

🔍 SEARCH PERFORMANCE
- Total Impressions: [X]
- Total Clicks: [X]
- Average CTR: [X%]
- Average Position: [X]

🎯 TOP RANKING KEYWORDS
1. [Keyword] - Pos: [X] - CTR: [X%]
2. [Keyword] - Pos: [X] - CTR: [X%]
3. [Keyword] - Pos: [X] - CTR: [X%]

⚠️ ISSUES DETECTED
- [Issue 1]
- [Issue 2]

✅ ACTIONS TAKEN
- [Action 1]
- [Action 2]

📈 NEXT WEEK PRIORITIES
1. [Priority 1]
2. [Priority 2]
```

---

## Red Flags & When to Act

| Red Flag | Action | Timeline |
|----------|--------|----------|
| 0 pages indexed after 2 weeks | Check robots.txt, submit sitemap | Immediate |
| CTR drops >30% in 1 week | Review SERP snippets, optimize titles | 24 hours |
| New errors in GSC coverage | Investigate error types, fix issues | 48 hours |
| Mobile usability errors | Fix responsiveness issues | 24 hours |
| Schema validation errors | Fix schema markup | 24 hours |

---

## Success Story: Expected Timeline

**Week 1-2:**
- 30-50 merchant pages indexed
- Brand searches (merchant name) showing in results
- Rich snippets appearing

**Week 3-4:**
- 100+ pages indexed
- Ranking for merchant + city queries
- Getting 50+ organic clicks

**Month 2:**
- 200-300 pages indexed
- Consistent organic traffic
- Rich results displaying consistently

**Month 3+:**
- 300-500+ pages indexed
- Established rankings for category searches
- Sustainable organic traffic growth

---

**Remember**: SEO is a long-term strategy. Consistent monitoring and optimization lead to exponential growth! 🚀
