# Claude Instructions for BlueGridMedia

## Calculator Page SEO — Programmatic Uniqueness

### Overview
200 city × industry pages live in `/calculators/`, generated from `templates/calculator-city-template.html` via `scripts/generate-city-calculator-pages.js`.

### COMPLETED (2026-03-07): Add unique content blocks per industry and city
- Template variables `{{INDUSTRY_CONTENT_BLOCK}}` and `{{CITY_CONTENT_BLOCK}}` are live
- `<section class="city-industry-guide">` inserted in template between iframe wrapper and FAQ section
- `INDUSTRY_CONTENT_BLOCKS` and `CITY_CONTENT_BLOCKS` dictionaries added to generator script (sections 7 & 8)
- All 200 pages regenerated — no raw `{{VARIABLES}}` remain in output
- Re-run generator any time with: `node scripts/generate-city-calculator-pages.js`

---

## Blog Post Creation Guidelines

### Content Quality
- Match the structure and style of existing blog posts in `/blog/`
- Write highly valuable, unique content — no generic filler
- Target user pain points to make content relatable and engaging
- Optimize for maximum organic impressions and clicks (SEO-first mindset)

### SEO
- Use keyword-rich headings (H1, H2, H3) that match search intent
- Write compelling meta titles and descriptions
- Use structured data / schema markup consistent with existing posts
- Aim for comprehensive coverage of the topic to outrank competitors

### Internal Linking
- Add internal links to related blog posts where appropriate
- Link to relevant calculator pages where appropriate
- Link to LSA hub pages where appropriate

### URL Conventions
- Blog post URLs do NOT include `.html` at the end
- Blog post URLs do NOT require `/blog/` prefix — all posts work without it
- Example: `/google-lsa-for-hvac-companies` not `/blog/google-lsa-for-hvac-companies.html`

### Existing Blog Posts (for reference and internal linking)

#### Industry LSA Guides
- `/google-lsa-for-hvac-companies`
- `/google-lsa-for-electricians`
- `/google-lsa-for-roofers`
- `/google-lsa-for-plumbers` (plumbing-ads-playbook)
- `/google-lsa-for-pest-control`
- `/google-lsa-for-landscaping`
- `/google-lsa-for-carpet-cleaning`
- `/google-lsa-for-appliance-repair`
- `/google-lsa-for-tree-service`
- `/google-lsa-for-water-damage-restoration`
- `/garage-door-local-services-ads`

#### General LSA Resources
- `/google-ads-vs-lsa-plumbers`
- `/google-lsa-ranking-factors`
- `/how-much-does-google-lsa-cost`
- `/lsa-no-calls-guide`

#### Pillar Articles (added 2026-03-07)
- `/how-to-rank-number-1-google-local-services-ads` — How to Rank #1 in Google LSA
- `/how-many-leads-google-local-services-ads` — How Many Leads Do LSA Generate?
- `/google-ads-vs-local-services-ads-contractors` — Google Ads vs. LSA for Contractors
- `/how-to-get-google-guaranteed` — How to Get Google Guaranteed (Step-by-Step)
- `/why-local-services-ads-leads-get-disputed` — Why LSA Leads Get Disputed

### Pillar Article Visual Components (added 2026-03-07)
- Each pillar article has 6 inline HTML/CSS visual components (charts, diagrams, flowcharts, comparisons)
- All CSS classes prefixed with `visual-` to avoid conflicts
- Each article has 1 AI-generated `<img>` (user-provided via ChatGPT/Grok)
- Visual components are responsive (stack on mobile) and use the site design system
- Image paths follow pattern: `/assets/images/blog/[slug]/[filename].png`

#### COMPLETED (2026-03-07): All 5 AI-generated images added
1. `how-to-rank-number-1-google-local-services-ads` → `lsa-search-results-position-breakdown.png` ✅
2. `how-many-leads-google-local-services-ads` → `lsa-lead-flow-diagram.png` ✅
3. `google-ads-vs-local-services-ads-contractors` → `google-search-results-lsa-vs-ppc-positions.png` ✅
4. `how-to-get-google-guaranteed` → `google-verified-badge-lsa-listing-example.png` ✅
5. `why-local-services-ads-leads-get-disputed` → `lsa-dashboard-rate-lead-button.png` ✅

### COMPLETED (2026-03-07): Sitemap & Resources Page Updated
- 5 pillar article URLs added to `sitemap.xml` with priority 0.7 and lastmod 2026-03-07
- 5 pillar article cards added to `resources.html` at the top of the grid (after calculator sections)
- "New — Lead Disputes" tag on the latest pillar article (Why LSA Leads Get Disputed)
- Previous "New" tag on "How Much Does Google LSA Cost?" changed to "LSA Pricing"
