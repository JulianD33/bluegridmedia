# Plan: Improve Ranking Factors Post + Duplicate Content Fixes + Homepage Optimization

## Part A: Homepage Improvements (Quick Wins — Do First)

### A1. Fix "Real Results" tagline getting cut off
- The `header` has `overflow: hidden` + the `::after` diagonal cut creates a 64px clip at the bottom
- The `.tagline` sits at the very bottom with only `margin-top: 24px` and gets clipped by the diagonal
- **Fix:** Add `padding-bottom` to the header or increase the bottom padding from 80px to ~110px so the tagline has breathing room above the diagonal cut

### A2. Remove dashes and improve copy
Current text with issues:
- `"7–10 days"` → change to `"7 to 10 days"`
- `"ROI — not vanity metrics"` → rewrite without dash
- `"We monitor leads, adjust bids, track call quality, and send monthly reports you actually understand."` — fine but could be punchier
- Hero subtext is generic agency-speak: "Blue Grid Media is a specialized agency helping local service businesses generate qualified leads..." → rewrite to be benefit-first, less AI-sounding

### A3. Fix inaccurate content
- Step 2 says "Google Guarantee" but Google renamed it to "Google Verified" in Oct 2025 — update
- The testimonial `"Blue Grid Media transformed our local visibility..."` sounds generic/fabricated — either make it real or remove it
- Links to `/case-studies.html` and `/team.html` — verify these pages exist and are populated

### A4. Improve conversion copy for more form fills
- Hero heading: solid, keep as-is (keyword-rich)
- Hero subtext: rewrite to focus on outcomes, not description
- CTA section: "Ready to blueprint your local success? Start dominating your local market today." → sounds like AI filler. Rewrite to speak to contractor pain points
- Add urgency/specificity to CTAs where possible
- The "Free Eligibility Check" highlight box is a good conversion driver — make it more prominent

### A5. Specific homepage edits:

**Hero subtext** (line 110):
FROM: "Blue Grid Media is a specialized agency helping local service businesses generate qualified leads through Google Local Services Ads. We work with contractors, home services, healthcare providers, legal professionals, and more."
TO: Something benefit-first like: "We help contractors and local service businesses get more qualified phone calls through Google Local Services Ads. No long term commitments, no wasted ad spend. Just real leads from customers ready to hire."

**Step 2** (line 206):
FROM: "We handle profile optimization, application, and activation — with ads typically going live in 7–10 days."
TO: "We handle profile optimization, application, and activation. Most ads go live within 7 to 10 days."

**About section** (line 284):
FROM: "We focus on lead quality, call relevance, and ROI — not vanity metrics."
TO: "We focus on lead quality, call relevance, and ROI. Not vanity metrics."

**CTA section** (line 310):
FROM: "Ready to blueprint your local success? Start dominating your local market today."
TO: "Most LSA accounts waste 30%+ of their budget on junk leads. Let us show you where yours is leaking."

**Trust testimonial** (line 132):
FROM: generic testimonial
TO: Remove the testimonial entirely (or replace with a real one if available). Keep the "5-Star Results" badge.

---

## Part B: Improve `google-lsa-ranking-factors.html` Post

### B1. Add 4-5 Visual Components (match pillar article standard)
Currently has only 1 hero image + 1 table. Pillar articles have 6 components + 1 image. Add:

1. **Ranking Factor Pyramid** — visual showing the 7 factors stacked by impact (reviews at top, messaging at bottom)
2. **Response Time Impact Chart** — horizontal bar chart showing ranking impact at different response times (< 30s, 30s-2min, 2-5min, 5min+)
3. **Profile Completeness Scorecard** — interactive-style checklist (like the Google Guaranteed one) showing what "100% complete" looks like
4. **Before/After Comparison** — side-by-side showing "Unoptimized LSA Profile" vs "Optimized LSA Profile" with metrics
5. **Review Velocity Tracker** — visual showing review targets by market size

### B2. Add More Specific Benchmarks
- Review velocity targets by market size (small/medium/large metro)
- Response time targets in seconds (not just "answer quickly")
- Profile completeness percentage impact on impression share
- Cost-per-booked-job worked example with actual numbers

### B3. Expand Thin Sections
- **Bid Mode**: Add comparison table (Maximize Leads vs Max Per Lead) with pros/cons/when to use each
- **GBP Accuracy**: Add data flow explanation (how GBP reviews feed into LSA)
- **Services Enabled**: Add per-industry checklist of commonly missed job types

### B4. Add Internal Links to Pillar Articles
Currently only links to 2 posts inline. Add contextual links to:
- `/how-to-rank-number-1-google-local-services-ads` (cross-reference the deeper pillar)
- `/how-to-get-google-guaranteed` (from the profile completeness/verification sections)
- `/why-local-services-ads-leads-get-disputed` (from the lead dispute mention)
- `/how-many-leads-google-local-services-ads` (from budget/tracking section)
- `/how-much-does-google-lsa-cost` (from bid mode section)

### B5. Differentiate from "How to Rank #1" Pillar
- The ranking factors post should be the "reference guide" (concise, factor-by-factor)
- The pillar article should be the "comprehensive playbook" (deep, strategy-focused)
- Add a note at the top: "For a deeper strategic playbook, see our complete guide on [how to rank #1 in LSA](/how-to-rank-number-1-google-local-services-ads)"
- This makes them complementary rather than competing

---

## Part C: Duplicate Content Strategy (Recommendations Only — Don't Execute Yet)

### Critical Findings:
The 11 industry guides are the biggest risk. They use near-verbatim text across:
- "How to Rank" sections (same advice, same phrasing, name swapped)
- "Common Mistakes" sections (identical 5-6 mistakes)
- "How to Track Results" (same 4 bullet points)
- "LSA + Google Ads" sections (same strategic advice)
- FAQ answers (same questions, same answers, 11x)
- Setup steps (identical 7-step process)
- Conclusions (near-identical paragraphs)

### Recommended approach (for discussion — big scope):
1. **Rewrite each industry guide** with truly unique industry-specific content: case-study-style data, seasonal patterns, job-type deep dives unique to that trade, CPL ranges specific to that industry
2. **Replace generic repeated sections** with 1-2 sentence summaries that link to the dedicated resource post (e.g., "For ranking tips, see our [LSA ranking factors guide](/google-lsa-ranking-factors)")
3. **Differentiate FAQ schema** — each industry guide should have unique FAQ questions, not the same 6 questions
4. **Consider consolidating** the plumber-specific comparison post into the plumbing guide

This is a large effort (11 posts × significant rewrites). Recommend tackling in a separate session.

---

## Execution Order:
1. **Part A** — Homepage fixes (quick, high-impact since it gets the most clicks)
2. **Part B** — Ranking factors post improvements (visual components + content expansion)
3. **Part C** — Present duplicate content findings to user for discussion (don't auto-execute)
