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

### New Blog Post Checklist
Every new blog post MUST include ALL of the following steps:
1. Create the HTML file in `/blog/` directory
2. Add 301 redirect (`/blog/slug → /slug`) and 200 rewrite (`/slug → /blog/slug.html`) to `_redirects`
3. Add the URL to `sitemap.xml` with appropriate priority and lastmod date
4. Add a resource card to `resources.html` with correct thumbnail path
5. Update the "Existing Blog Posts" list below in this file
6. Generate and add hero image to `/assets/images/blog/[slug]/`

### Tone & Writing Style
- Write in a relatable, human tone that targets reader pain points
- Make readers feel understood with "we get it" empathy moments
- Add light humor where appropriate
- Use contractor language, not corporate speak
- AVOID em dashes (`&mdash;` or `—`), use commas, periods, or other natural punctuation instead
- Vary section structure, don't repeat the same rigid format for every section

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
- `/google-lsa-for-painters`
- `/google-lsa-for-locksmiths`
- `/google-lsa-for-house-cleaning`
- `/google-lsa-for-movers`
- `/google-lsa-for-junk-removal`
- `/google-lsa-for-fencing`
- `/google-lsa-for-pool-service`
- `/google-lsa-for-handyman`

#### General LSA Resources
- `/google-ads-vs-lsa-plumbers`
- `/google-lsa-ranking-factors`
- `/how-much-does-google-lsa-cost`
- `/lsa-no-calls-guide`

#### Pillar Articles (added 2026-03-07)
- `/seo-vs-local-services-ads-contractors` — SEO vs. LSA for Contractors (added 2026-03-10)
- `/google-business-profile-optimization-contractors` — GBP Optimization for Contractors (added 2026-03-10)
- `/lsa-vs-thumbtack-vs-angi-contractors` — LSA vs. Thumbtack vs. Angi for Contractors (added 2026-03-09)
- `/google-local-services-ads-not-working` — LSA Not Working? 12 Reasons + Fixes (added 2026-03-09)
- `/google-lsa-review-strategy` — LSA Review Strategy: Get More Reviews, Rank Higher (added 2026-03-09)
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

## New Blog Posts: LSA Not Working + LSA Review Strategy (2026-03-09)

### COMPLETED: `/google-local-services-ads-not-working`
Troubleshooting guide — 1,246 lines, 6 visual components, FAQPage schema.

#### Visual Components
1. **Diagnostic flowchart**: "Is your LSA showing?" Yes/No decision tree
2. **Impact severity cards**: Critical (red), Moderate (orange), Minor (green)
3. **Fix timeline bar chart**: Recovery time for each of the 12 issues
4. **Before/After metrics cards**: Lead volume, ranking, CPL changes after fixing top issues
5. **Common mistakes comparison**: Wrong vs. right approaches (7 rows)
6. **Response time impact chart**: Lead conversion rate at 5 response time intervals

#### Content Sections
- Quick Diagnostic Checklist (5 items)
- 12 Reasons with diagnosis + fix for each
- How to Contact LSA Support
- When to Hire an LSA Management Agency
- FAQ (6 questions)

### COMPLETED: `/google-lsa-review-strategy`
Review strategy deep-dive — 1,327 lines, 6 visual components, FAQPage schema.

#### Visual Components
1. **Review count impact chart**: Review ranges correlated with ranking positions
2. **Star rating benchmark cards**: 4 tiers from Below 3.0 (paused) to 4.8+ (dominant)
3. **Review velocity comparison**: Burst vs. consistent strategy side-by-side
4. **Before/After metrics**: Contractor transformation (12→87 reviews, impact on leads/CPL)
5. **Review request timing diagram**: 4-step optimal timing timeline
6. **Common mistakes comparison**: What hurts vs. what helps (8 items each)

#### Content Sections
- Why Reviews Are the #1 LSA Ranking Factor
- The Review Benchmarks That Matter (50+, 100+, 4.8★)
- The GBP Review Merger: What Changed in 2025
- 5-Step Review Collection System
- How to Handle Negative Reviews
- Review Velocity: Consistency Beats Bursts
- Copy-Paste Templates (SMS, follow-up, response)
- Common Review Strategy Mistakes

#### Supporting Changes for Both Articles
- Added to `sitemap.xml` with priority 0.7 and lastmod 2026-03-09
- Added `_redirects` rules (301 redirects + 200 rewrites) for both slugs
- Added 2 resource cards to `resources.html` (top of pillar articles, "New" tags)
- Previous "New — Comparison" tag on LSA vs Thumbtack changed to "Comparison"
- Image directories created for both articles (hero images TBD)

---

## Case Studies Hub + New Case Study Pages (2026-03-10)

### COMPLETED: Case Studies Architecture Overhaul
Transformed single case study page into hub + 3 individual case study pages.

#### New Pages
- **`case-study-hvac-illinois.html`** — Existing HVAC content moved to standalone page
  - Article + BreadcrumbList + WebSite schema in @graph
  - Canonical URL: `/case-study-hvac-illinois`
  - Results: 28% more leads, 15% lower CPL, 4x ROAS, 40% more booked jobs

- **`case-study-plumbing-dallas.html`** — New plumbing case study (Dallas, TX)
  - Mid-size residential plumbing company, 3 trucks, 8 years in business
  - Strategy: GBP + review overhaul, then LSA optimization
  - Results: 22% more leads, 18% lower CPL, 3.2x ROAS, reviews 23→51
  - Timeline: 8 weeks, budget $1,200–$1,600/mo

- **`case-study-electrician-denver.html`** — New electrician case study (Denver, CO)
  - Owner-operator + 1 apprentice, 4 years in business
  - Strategy: Service category expansion (3→9) + response time protocol (47→8 min)
  - Results: 35% more booked jobs, 31% lower cost/job, 2.8x ROAS
  - Timeline: 10 weeks, budget $800–$1,200/mo

#### Modified Pages
- **`case-studies.html`** — Transformed into hub/listing page
  - Card grid layout (`.csh-` CSS prefix) modeled on resources.html
  - Featured HVAC card (full-width) + plumbing/electrician side-by-side
  - Each card shows metrics strip, industry tag, overview, summary
  - CollectionPage + BreadcrumbList schema
  - CTA section at bottom

- **`index.html`** — Updated 4 internal links
  - HVAC-specific links → `/case-study-hvac-illinois`
  - General references → `/case-studies`

- **`sitemap.xml`** — Added 3 new URLs, updated `/case-studies` lastmod and priority
- **`blog/lsa-vs-thumbtack-vs-angi-contractors.html`** — Fixed case study link

#### URL Structure
- `/case-studies` — Hub/listing page
- `/case-study-hvac-illinois` — HVAC case study
- `/case-study-plumbing-dallas` — Plumbing case study
- `/case-study-electrician-denver` — Electrician case study

---

## Blog Content Index (for Overlap Detection)

> Updated 2026-03-11. **Always check this section before planning new posts** to avoid duplicate content and identify genuine gaps.

---

### How to Use This Index

Before proposing a new blog post, scan:
1. The "Industry Angle / Unique Sections" column — does any existing post already own the angle?
2. The "Does NOT Cover" column — these are genuine gaps that a new post could fill
3. The "Content Gaps" section at the bottom for pre-identified opportunities

---

### Industry LSA Guides (19 posts)

All 19 industry guides share the same core template skeleton:
- Is LSA worth it for this industry?
- What LSA looks like in search results
- Step-by-step setup + job type checklist
- LSA cost / CPL ranges
- How to rank higher (5 factors: reviews, response time, job types, profile completeness, proximity)
- Common mistakes
- LSA vs. Google Ads comparison
- How to track results
- FAQ (6 questions)

**What makes each post unique (the industry-specific angle):**

| Slug | Unique Angle / Extra Sections | Does NOT Cover |
|------|-------------------------------|----------------|
| `/google-lsa-for-hvac-companies` | Seasonality strategy, repair-to-replacement pipeline, maintenance plan economics, after-hours call value, dispatch optimization | Advanced Google Ads, furnace/AC technical specs |
| `/google-lsa-for-electricians` | EV charger opportunity, residential vs. commercial lead split | Seasonal strategy, maintenance plans, after-hours specifics |
| `/google-lsa-for-roofers` | Storm/hail seasonality, insurance claim lead quality, review photo impact, storm chaser differentiation | Maintenance/recurring, dispatch optimization |
| `/plumbing-ads-playbook-google-local-services-ads` | LSA + Google Ads dual strategy (8-step Google Ads blueprint), mini case study, water heater vs. drain economics | Seasonal strategy, plumbing maintenance plans |
| `/google-lsa-for-pest-control` | Recurring revenue model, one-time to plan conversion ($1,800+ LTV), inspection package upsells | Detailed job type list, seasonal budget strategy |
| `/google-lsa-for-landscaping` | Residential vs. commercial split, 5-phase seasonal strategy, hardscaping vs. maintenance economics, project photo ranking | Recurring maintenance plan economics |
| `/google-lsa-for-carpet-cleaning` | Commercial vs. residential value, service upsells (tile, upholstery, water damage) | Job type checklist, seasonal strategy |
| `/google-lsa-for-appliance-repair` | Brand authorization impact, first-visit fix rates, repair vs. replace call handling | Seasonal strategy, maintenance plans |
| `/google-lsa-for-tree-service` | Storm surge strategy (50-100% budget spike), HOA commercial jobs ($5K-$20K), stump grinding upsell | Google Ads comparison, specific ROI by market |
| `/google-lsa-for-water-damage-restoration` | Emergency call handling, insurance vs. cash-pay job economics, mold remediation (15-25% lead volume) | Commercial restoration, fire damage economics |
| `/garage-door-local-services-ads` | High ROI on door installations ($1,200-$2,500), dispute process and lead validation focus | Maintenance/preventative service, commercial systems |
| `/google-lsa-for-painters` | Large-ticket advantage ($3,200 avg cost/booked job), estimate-to-booking gap (2hr/24hr/72hr follow-up), interior vs. exterior seasonality | Commercial/industrial painting, specialty finishes |
| `/google-lsa-for-locksmiths` | Trust problem + how Google Verified solves it, upsell strategy ($100 lockout → $400 job), after-hours ranking advantage | Commercial access control, automotive locksmith |
| `/google-lsa-for-house-cleaning` | Recurring revenue model (LTV $3K-$6K/year), converting first clean to recurring (30-40%), in-person pitch vs. email (under 10%) | Commercial office cleaning, post-construction |
| `/google-lsa-for-movers` | Speed-to-quote as the #1 variable, peak season (May-Sep = 70% of annual volume), packing service upsells | International relocation, military PCS, warehouse moves |
| `/google-lsa-for-junk-removal` | Zone-based scheduling, stacking small jobs around anchor jobs, niche services (estate cleanouts, hoarding, construction debris), pricing models | Hazardous waste, recycling/landfill partnerships |
| `/google-lsa-for-fencing` | High-ticket overlooked category, materials conversation (wood/vinyl/composite), permit/HOA navigation, estimate-to-contract in 72hrs | Detailed CPL pricing, broader ad platforms |
| `/google-lsa-for-pool-service` | Recurring route economics, route density (20-pool profitability threshold), one-time repair to recurring conversion (30-40%), geography-specific seasonality | CPL by market, equipment install in depth |
| `/google-lsa-for-handyman` | Job stacking (4-8 jobs/day), 12-15+ job types (broadest category), per-task vs. hourly pricing, 25-30% return customer rate | State-by-state licensing, licensed trade referrals |

**Industries eligible for LSA but NOT yet covered:**
- General contractors (residential remodeling)
- Flooring (carpet install, hardwood, tile)
- Gutters (install + cleaning)
- Pressure washing / exterior cleaning
- Chimney sweep / fireplace
- Irrigation / sprinkler systems
- Siding / exterior cladding
- Windows / glass replacement

---

### General LSA Resource Posts (4 posts)

| Slug | Core Topic | Does NOT Cover |
|------|------------|----------------|
| `/google-lsa-ranking-factors` | 7 ranking factors deep-dive: reviews, response time, bid mode, GBP connection, messaging, service area, profile completeness | Industry-specific ranking differences, competitor analysis, historical data |
| `/how-much-does-google-lsa-cost` | CPL by industry, budget sizing formula (target leads × CPL × 4), ways to lower CPL, week-to-week variance (20-40%) | Regional price variations by city, historical pricing trends |
| `/lsa-no-calls-guide` | 12 reasons + fixes, 2-min diagnostic checklist, KPIs to track weekly, copy-paste scripts, support escalation | Industry-specific troubleshooting, competitive market analysis |
| `/google-ads-vs-lsa-plumbers` | LSA vs. Google Ads for plumbers: cost, quality, setup difficulty, recommendations | Google Ads campaign structure, detailed ROI modeling for combined strategy |

---

### Pillar Articles (10 posts)

| Slug | Core Topic | Does NOT Cover |
|------|------------|----------------|
| `/how-to-rank-number-1-google-local-services-ads` | 8-week ranking roadmap, all 6 ranking factors, review system, bidding strategy (Maximize Leads vs. Max/Lead), 6 ranking killers | Industry-specific data, budget sizing, competitor analysis |
| `/how-many-leads-google-local-services-ads` | Lead volume by budget tier, CPL by industry, booking rates by industry, unbookable lead problem (45%), 7 volume factors | Dispute/credit process, detailed ranking factors |
| `/google-ads-vs-local-services-ads-contractors` | Full head-to-head: cost, lead quality, ease of management, SERP position, when to use each, budget split recommendations | SEO comparison, Google Ads bid strategies, brand building |
| `/lsa-vs-thumbtack-vs-angi-contractors` | 3-platform comparison: how each works, scorecard, cost per booked job by industry, lead quality deep-dive, $2K budget ROI | Multi-platform management strategy, regional pricing, platform-specific optimization |
| `/why-local-services-ads-leads-get-disputed` | AI credit system (4 stages), eligible vs. ineligible leads, 6-step dispute process, how dispute behavior affects ranking | Fraud detection methodology, long-term dispute trends |
| `/google-local-services-ads-not-working` | 12 specific reasons leads stopped + fixes, quick diagnostic checklist, support contact guide, when to hire agency | Recovery timelines per issue, competitive market analysis, advanced optimization |
| `/google-lsa-review-strategy` | Review benchmarks (50+/150+/4.8★), GBP review merger (2025), 5-step collection system, velocity strategy, copy-paste templates | Paid review methods, industry-specific templates, review sentiment analysis |
| `/seo-vs-local-services-ads-contractors` | Channel comparison: cost, timeline to ROI, SERP positions, compound SEO effect, phased budget approach | Advanced SEO tactics (on-page, link building), other paid channels |
| `/google-business-profile-optimization-contractors` | 7 GBP ranking factors, category selection (the #1 mistake), NAP consistency, GBP-to-LSA connection, fighting fake competitors | Advanced photo optimization, Google Ads integration, long-term GBP roadmap |
| `/how-to-get-google-guaranteed` | Google Verified badge (Oct 2025 rebrand), step-by-step verification process, insurance/background check requirements, annual renewal | State-by-state licensing specifics, background check disqualification criteria |

---

### Content Gap Analysis (Genuine Opportunities)

These topics are NOT yet covered by any existing post and have meaningful search demand:

**High priority (strong search intent + no overlap):**
1. **"Is Google LSA Worth It for Contractors?"** — Every industry guide has a brief "is it worth it" section but no standalone deep-dive with break-even analysis, ROI calculator integration, and "LSA vs. doing nothing" framing. Estimated 1,500-3,000 searches/mo.
2. **"How to Lower Your Google LSA Cost Per Lead"** — CPL reduction is mentioned across ranking factors, disputes, no-calls guide, and cost posts but never as a dedicated, comprehensive guide. High-intent keyword for contractors already running LSA who want to optimize. Estimated 600-1,200/mo.
3. **"Google LSA for General Contractors"** — Major eligible industry not covered. Unique angle: large projects, lead qualification challenges, commercial vs. residential split, subcontractor coordination. Estimated 800-1,500/mo.
4. **"Google Verified Badge: What Changed in 2025 and What It Means for Your LSA"** — The Oct 2025 Google Guaranteed → Google Verified rebrand + money-back guarantee removal is mentioned in how-to-get-google-guaranteed but a standalone "what changed" explainer could capture time-sensitive searchers. High topical authority play.
5. **"LSA for Flooring Contractors"** — Not covered. High-ticket installs ($3K-$10K), seasonal spring peak, good LSA fit. Estimated 400-800/mo.
6. **"Google LSA Lead Quality: How to Get Fewer Tire-Kickers"** — Unbookable lead problem (45%) touched on in how-many-leads but a dedicated post on qualifying leads, disputing bad ones, and optimizing for quality doesn't exist.

**Medium priority:**
7. **"Google LSA for Multi-Location Businesses"** — Scaling across multiple cities/locations is a completely different setup challenge. No overlap with existing posts.
8. **"LSA for Pressure Washing / Exterior Cleaning"** — Not covered. Low CPL industry, strong seasonal demand.
9. **"LSA for Gutter Companies"** — Not covered. Strong fall/storm season lead demand.

**Avoid (would heavily overlap existing content):**
- "How to rank in LSA" → already `/how-to-rank-number-1-google-local-services-ads` and `/google-lsa-ranking-factors`
- "LSA pricing/cost" → already `/how-much-does-google-lsa-cost`
- "LSA vs. Google Ads" → already covered (plumbers + general contractors)
- "LSA reviews" → already `/google-lsa-review-strategy`
- "LSA not working / troubleshooting" → already covered
- Industry guide for HVAC, plumbing, electricians, roofing, landscaping, pest control, carpet cleaning, appliance repair, tree service, water damage, garage door, painters, locksmiths, house cleaning, movers, junk removal, fencing, pool service, handyman — all done

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
