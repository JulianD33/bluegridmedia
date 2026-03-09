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
- `/plumbing-ads-playbook-google-local-services-ads`
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
- `/lsa-vs-thumbtack-vs-angi-contractors` — LSA vs. Thumbtack vs. Angi for Contractors (added 2026-03-09)
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

---

## Homepage Optimization (2026-03-08)

### COMPLETED: Homepage SEO, Conversion & Design Overhaul
Major changes to `index.html` and `style.css`:

#### Hero Section
- Bolded stat line: "28% more qualified leads. 15% lower cost per lead."
- Two CTA buttons: "Get My Free LSA Audit" (primary) + "View Services & Pricing" (secondary)
- Trust badges row: Google Verified, No Contracts, Qualified Leads, 7–10 Day Setup
- Tagline: "Precision Ads. Real Results."

#### Stats Bar (new section)
- 4 animated counter cards: 28% More Leads, 15% Lower CPL, 4x ROAS, 40% More Booked Jobs
- IntersectionObserver-powered counter animation
- Source line linking to case study

#### Services Section
- 3 service cards with SVG icons: LSA Setup & Management, Profile Optimization, Call Audits & Optimization
- Each card has internal links to relevant blog posts
- "View All Services & Pricing" CTA button

#### Industries Section
- 11 industry cards in responsive grid with SVG icons
- Heading: "Most Popular Industries on Local Services Ads"
- Subtitle: "These are the trades we work with most — but we manage LSA for any Google-eligible service business"
- "Don't see your industry? Contact us" line below grid
- "Calculate Your LSA ROI" CTA button

#### How It Works Section
- 3-step process cards with numbered circles: Audit, Setup, Optimization

#### Case Study Showcase Section
- 4 metric cards (28%, 15%, $62, 4x) in gradient banner
- Strategy bullet points + "Read the Full Case Study" CTA

#### Eligibility Section
- 3 requirement cards with icons: Documentation, Business Profile, Background Check
- "Free Eligibility Check" highlight box

#### About Section
- Company description + "Why Contractors Trust Blue Grid Media"
- Internal links to services, case studies, pricing, resources

#### FAQ Section
- 6 FAQ items using `<details>` elements
- FAQPage schema in JSON-LD `@graph`
- Each answer includes internal links to relevant pages

#### Resources Hub Section (new)
- 6 resource cards: Rank #1 Guide, Lead Volume Data, LSA Cost, Ranking Factors, No Calls Guide, ROI Calculator
- Tag badges (Guide, Data, Pricing, Troubleshoot, Tool)

#### CTA Section
- "Get Your Free LSA Performance Review" with urgency line
- Contact modal with form (name, email, phone, business type, message)
- Netlify function form submission

#### Schema Markup
- `@graph` array: Organization, FAQPage (6 Qs), Service (with offers), WebSite
- Open Graph + Twitter Card meta tags

### COMPLETED: Homepage CSS (style.css additions)
- Design tokens in `:root`: `--primary: #1a4b7a`, `--bg-light: #f5f7fa`, `--shadow`, `--radius-lg`, `--text-light`
- Stats bar: `.homepage-stats`, `.results-stats`, `.stat-card`, `.stat-number`, `.stat-label`
- Industries: `.industries-section`, `.industries-grid`, `.industry-card`, `.industry-icon`
- Case study: `.case-study-section`, `.case-study-card`, `.case-study-metrics`, `.case-metric`
- Eligibility: `.eligibility-section`, `.eligibility-grid`, `.eligibility-item`, `.eligibility-icon`
- Resources hub: `.resources-hub-section`, `.resources-hub-grid`, `.resource-link-card`, `.resource-link-tag`
- CTA: `.cta-section`, `.cta-buttons`, `.btn-primary`, `.btn-secondary`
- Modal: `.modal`, `.modal-content`, `.contact-form`
- Animations: `.fade-up` with IntersectionObserver, counter animations
- Full responsive breakpoints at 768px, 600px

---

## Case Study Page Redesign (2026-03-08)

### COMPLETED: Visual Overhaul of case-studies.html
Complete redesign from plain text (~179 lines) to rich visual page (~680 lines):

#### Layout
- Two-column grid: main content (1fr) + sticky sidebar (300px)
- Responsive: stacks to single column at 920px

#### Visual Components
- **Hero metrics strip**: 4 gradient cards (28% leads, 15% CPL reduction, $62 avg CPL, 4x ROAS)
- **Overview box**: 2-column grid (Industry, Location, Timeline, Budget)
- **Before/after bar charts**: CSS-only with gradient fills and percentage labels
- **SVG donut chart**: Lead source breakdown (75% LSA, 15% referrals, 10% organic)
- **Timeline diagram**: 4 optimization phases with connected dots
- **Campaign structure tree**: 3 ad group branches from "Main LSA Campaign"
- **Comparison table**: Week-by-week metrics (Weeks 1-2, 3-6, 7-12)
- **Impact cards**: 3 cards with SVG icons showing key improvements
- **Combined impact bar chart**: Before vs after comparison

#### Sidebar
- Sticky table of contents with numbered links
- Quick stats box (5 key metrics)
- CTA box: "Want Results Like These?"
- Related resources (6 internal links)

#### CSS
- All styles in inline `<style>` tag (~400 lines)
- Classes prefixed with `cs-` (e.g., `.cs-page`, `.cs-grid`, `.cs-main`, `.cs-sidebar`)
- Responsive breakpoints: 920px, 700px, 600px, 520px, 420px

---

## Calculator FAQPage Schema Fix (2026-03-08)

### COMPLETED: Fix Duplicate FAQPage on 200 City Calculator Pages
Google Search Console reported "Duplicate field FAQPage" errors.

#### Root Cause
- City template (`templates/calculator-city-template.html`) had its own FAQPage (5 city-specific Qs)
- Embedded iframe (`lsa-roi-calculator.html`) also had a FAQPage (7 generic Qs)
- Google detected both → duplicate schema error

#### Fix (two-pronged)
1. **Merged FAQs in city template**: Combined into single FAQPage with 10 questions (5 city-specific + 5 generic from calculator)
   - Added: "How do I estimate booked jobs from LSA?", "What is a good cost per lead?", "Why does cost per booked job matter more than CPL?", "How is ROAS calculated?", "How do I improve my LSA economics?"
2. **Strip JSON-LD in iframe**: Added script to `lsa-roi-calculator.html` that removes all `<script type="application/ld+json">` tags when `?embed=1` parameter is present
3. **Regenerated all 200 pages**: `node scripts/generate-city-calculator-pages.js`

#### Result
- Each city page: 1 FAQPage with 10 questions ✅
- Iframe when embedded: 0 JSON-LD schemas ✅

---

## Homepage Spacing Fix (2026-03-08)

### COMPLETED: Tighten Section Spacing Across Homepage
Fixed excessive whitespace between sections and between headings/content.

#### Changes in style.css
- **Base section padding**: `90px 0` → `72px 0` (all sections)
- **Industries section**: `90px 0` → `64px 0` (extra tight for small cards)
- **Section-intro margin-bottom**: `52px` → `36px`
- **All grid margin-tops**: `44-52px` → `8px` (section-intro already provides spacing)
  - `.feature-grid`, `.industries-grid`, `.eligibility-grid`, `.results-stats`, `.case-study-card`, `.resources-hub-grid`

#### Sections updated
- `.feature-section`, `.process-section`, `.results-section`, `.eligibility-section`, `.about-section`, `.case-study-section`, `.resources-hub-section`, `.faq-section`, `.industries-section`

---

## SEO Fixes (2026-03-09)

### COMPLETED: robots.txt, Breadcrumb Schema, Orphan File Cleanup
- **robots.txt**: Changed sitemap reference from `sitemap.xml` → `sitemap-index.xml` (unlocks 200 calculator pages for Google)
- **resources.html**: Added BreadcrumbList JSON-LD schema (Home → Resources)
- **Deleted**: `LP.html` (orphan landing page variant) and `4af92731-951c-4770-abcc-f2332abea9c3.html` (UUID test file)

---

## New Blog Post: LSA vs. Thumbtack vs. Angi (2026-03-09)

### COMPLETED: `/lsa-vs-thumbtack-vs-angi-contractors`
Full comparison article — 1,454 lines, 6 visual components, FAQPage schema.

#### Visual Components
1. **Platform flow cards**: 3-column comparison (LSA teal, Thumbtack navy, Angi orange)
2. **Scorecard table**: Star ratings across 8 categories
3. **Cost per booked job bar chart**: 3 industries × 3 platforms
4. **Lead quality comparison cards**: 3-column with bullet points and icons
5. **Pros/cons cards**: Checkmarks and X icons for each platform
6. **Decision framework cards**: When to use each platform

#### Key Data Points
- LSA: $25-$80 CPL, 31% close rate, exclusive leads, Google Guaranteed badge
- Thumbtack: $15-$150+ CPL, 18% close rate, shared with 4-5 contractors
- Angi: $15-$100+ CPL + subscription, 12% close rate, shared with 2-4 contractors
- Cost per booked job: LSA $168 vs Thumbtack $250 vs Angi $542

#### Supporting Changes
- Added to `sitemap.xml` with priority 0.7 and lastmod 2026-03-09
- Added resource card to `resources.html` (top of pillar articles, "New — Comparison" tag)
- Previous "New — Lead Disputes" tag changed to "Lead Disputes"
- Image directory created: `/assets/images/blog/lsa-vs-thumbtack-vs-angi-contractors/` (hero image TBD)

---

## Development Setup

### Local Server
- `server.js` — Node.js static file server on port 8181
- `.claude/launch.json` — Preview server config (name: `dev`, port: 8181)
- Start with: `node server.js` or use preview tool

### Git Workflow
- Work happens on worktree branch `claude/modest-jemison`
- Worktree path: `.claude/worktrees/modest-jemison/`
- **Cannot checkout main from worktree** — merge from main repo directory:
  ```
  cd "C:\Users\julia\OneDrive\Desktop\BGM - Repository Git\bluegridmedia"
  git merge <commit-hash> --no-edit && git push origin main
  ```
- Deploy: push to `main` branch → Netlify auto-deploys
