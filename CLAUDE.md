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
- `/google-ads-vs-lsa-plumbers`
- `/google-lsa-ranking-factors`
- `/how-much-does-google-lsa-cost`
- `/lsa-no-calls-guide`
