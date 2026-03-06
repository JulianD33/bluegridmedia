/**
 * generate-city-calculator-pages.js
 *
 * Generates 200 programmatic city × industry LSA ROI calculator pages.
 *
 * Usage:
 *   node scripts/generate-city-calculator-pages.js
 *
 * Output:
 *   /calculators/{industry}-lsa-roi-calculator-{city-slug}.html  (200 files)
 *   sitemap-calculators.xml updated with all 200 city page URLs.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 1. Industries
// ---------------------------------------------------------------------------
const INDUSTRIES = [
  { slug: 'hvac',            label: 'HVAC' },
  { slug: 'plumbing',        label: 'Plumbing' },
  { slug: 'electrician',     label: 'Electrician' },
  { slug: 'roofing',         label: 'Roofing' },
  { slug: 'pest-control',    label: 'Pest Control' },
  { slug: 'landscaping',     label: 'Landscaping' },
  { slug: 'tree-service',    label: 'Tree Service' },
  { slug: 'carpet-cleaning', label: 'Carpet Cleaning' },
  { slug: 'appliance-repair',label: 'Appliance Repair' },
  { slug: 'garage-door',     label: 'Garage Door' },
];

// ---------------------------------------------------------------------------
// 2. Cities — 20 largest US cities
// ---------------------------------------------------------------------------
const CITIES = [
  { name: 'New York',      slug: 'new-york',      state: 'NY' },
  { name: 'Los Angeles',   slug: 'los-angeles',   state: 'CA' },
  { name: 'Chicago',       slug: 'chicago',       state: 'IL' },
  { name: 'Houston',       slug: 'houston',       state: 'TX' },
  { name: 'Phoenix',       slug: 'phoenix',       state: 'AZ' },
  { name: 'Philadelphia',  slug: 'philadelphia',  state: 'PA' },
  { name: 'San Antonio',   slug: 'san-antonio',   state: 'TX' },
  { name: 'San Diego',     slug: 'san-diego',     state: 'CA' },
  { name: 'Dallas',        slug: 'dallas',        state: 'TX' },
  { name: 'San Jose',      slug: 'san-jose',      state: 'CA' },
  { name: 'Austin',        slug: 'austin',        state: 'TX' },
  { name: 'Jacksonville',  slug: 'jacksonville',  state: 'FL' },
  { name: 'Fort Worth',    slug: 'fort-worth',    state: 'TX' },
  { name: 'Columbus',      slug: 'columbus',      state: 'OH' },
  { name: 'Charlotte',     slug: 'charlotte',     state: 'NC' },
  { name: 'Indianapolis',  slug: 'indianapolis',  state: 'IN' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'CA' },
  { name: 'Seattle',       slug: 'seattle',       state: 'WA' },
  { name: 'Denver',        slug: 'denver',        state: 'CO' },
  { name: 'Nashville',     slug: 'nashville',     state: 'TN' },
];

// ---------------------------------------------------------------------------
// 3. City market data — multipliers and descriptive text for unique content
//    Cities not listed here default to multiplier: 1, generic descriptions.
// ---------------------------------------------------------------------------
const CITY_MARKET_DATA = {
  'new-york':      { multiplier: 1.35, competition: 'extremely competitive',    demand: 'very high demand for home services' },
  'los-angeles':   { multiplier: 1.30, competition: 'extremely competitive',    demand: 'very strong demand for contractors' },
  'chicago':       { multiplier: 1.20, competition: 'highly competitive',       demand: 'strong demand for local services' },
  'houston':       { multiplier: 1.05, competition: 'competitive',              demand: 'growing demand for home services' },
  'phoenix':       { multiplier: 1.10, competition: 'competitive',              demand: 'rapidly increasing demand for contractors' },
  'dallas':        { multiplier: 1.00, competition: 'competitive',              demand: 'strong demand for home improvement services' },
  'seattle':       { multiplier: 1.25, competition: 'highly competitive',       demand: 'high demand for skilled trades' },
  'san-francisco': { multiplier: 1.40, competition: 'extremely competitive',    demand: 'very high demand for contractors' },
  'denver':        { multiplier: 1.10, competition: 'competitive',              demand: 'strong demand for local services' },
  'nashville':     { multiplier: 0.95, competition: 'moderately competitive',   demand: 'steady demand for home services' },
};

// ---------------------------------------------------------------------------
// 4. Base industry CPL ranges (mid-size market baseline)
// ---------------------------------------------------------------------------
const INDUSTRY_BASE_CPL = {
  'hvac':            { low: 40, high: 85  },
  'plumbing':        { low: 35, high: 80  },
  'electrician':     { low: 30, high: 70  },
  'roofing':         { low: 50, high: 120 },
  'pest-control':    { low: 25, high: 60  },
  'landscaping':     { low: 30, high: 70  },
  'tree-service':    { low: 45, high: 110 },
  'carpet-cleaning': { low: 20, high: 55  },
  'appliance-repair':{ low: 25, high: 65  },
  'garage-door':     { low: 30, high: 75  },
};

// ---------------------------------------------------------------------------
// 5. Market paragraph variations — one is selected per page for uniqueness
// ---------------------------------------------------------------------------
const MARKET_PARAGRAPH_VARIATIONS = [
  'The {{CITY}} market for {{INDUSTRY_LABEL}} services is highly active, with many homeowners and businesses relying on Google Local Services Ads to find trusted contractors.',
  '{{INDUSTRY_LABEL}} companies in {{CITY}} often use Google Local Services Ads as a primary lead channel because it connects them with customers actively searching for services.',
  'In {{CITY}}, Local Services Ads have become one of the most effective ways for {{INDUSTRY_LABEL}} companies to generate qualified leads from local customers.',
  'Demand for {{INDUSTRY_LABEL}} services in {{CITY}} continues to grow as more consumers rely on Google to find trusted local providers.',
];

// ---------------------------------------------------------------------------
// 6. City statistic sentences — unique factual sentence per city
// ---------------------------------------------------------------------------
const CITY_STATS = {
  'new-york':      'New York is the largest city in the United States, creating massive demand for home services.',
  'los-angeles':   'Los Angeles is one of the largest metro markets in the country with millions of homeowners.',
  'chicago':       'Chicago is a major metropolitan hub with strong demand for residential and commercial services.',
  'houston':       'Houston is one of the fastest growing metro areas in the United States.',
  'phoenix':       'Phoenix continues to see rapid population growth and strong demand for contractors.',
  'philadelphia':  'Philadelphia has a dense urban population and strong demand for local services.',
  'san-antonio':   "San Antonio's population growth has increased demand for home improvement services.",
  'san-diego':     "San Diego's large residential market creates strong demand for service professionals.",
  'dallas':        'Dallas is one of the fastest growing metro areas in the US.',
  'san-jose':      'San Jose sits in the heart of Silicon Valley with strong demand for local contractors.',
  'austin':        'Austin is one of the fastest growing cities in the United States.',
  'jacksonville':  'Jacksonville has one of the largest land areas of any major US city.',
  'fort-worth':    'Fort Worth continues to expand as part of the Dallas-Fort Worth metroplex.',
  'columbus':      'Columbus is one of the fastest growing cities in the Midwest.',
  'charlotte':     "Charlotte's rapid growth has increased demand for skilled trades.",
  'indianapolis':  'Indianapolis is one of the largest cities in the Midwest.',
  'san-francisco': 'San Francisco is one of the most competitive service markets in the country.',
  'seattle':       "Seattle's booming tech economy drives strong demand for local services.",
  'denver':        'Denver has experienced rapid population growth over the past decade.',
  'nashville':     'Nashville is one of the fastest growing cities in the United States.',
};

// ---------------------------------------------------------------------------
// 7. Static hub + industry pages that live in sitemap-calculators.xml
//    (kept here so the script can re-write the full file without losing them)
// ---------------------------------------------------------------------------
const STATIC_CALCULATOR_URLS = [
  { loc: 'https://bluegridmedia.com/calculators/',                                    lastmod: '2026-05-01', priority: '0.8' },
  { loc: 'https://bluegridmedia.com/calculators/hvac-lsa-roi-calculator',             lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/plumbing-lsa-roi-calculator',         lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/electrician-lsa-roi-calculator',      lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/roofing-lsa-roi-calculator',          lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/pest-control-lsa-roi-calculator',     lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/garage-door-lsa-roi-calculator',      lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/landscaping-lsa-roi-calculator',      lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/tree-service-lsa-roi-calculator',     lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/carpet-cleaning-lsa-roi-calculator',  lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/appliance-repair-lsa-roi-calculator', lastmod: '2026-05-01', priority: '0.7' },
];

// ---------------------------------------------------------------------------
// 8. Paths
// ---------------------------------------------------------------------------
const ROOT          = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'calculator-city-template.html');
const OUTPUT_DIR    = path.join(ROOT, 'calculators');
const TODAY         = new Date().toISOString().slice(0, 10);
const BASE_URL      = 'https://bluegridmedia.com';

// ---------------------------------------------------------------------------
// 9. Helpers
// ---------------------------------------------------------------------------

/**
 * Deterministically pick a paragraph variation for a given industry × city
 * combo so re-running the script produces the same output (no random drift).
 * Uses a simple index derived from the industry and city slugs.
 */
function pickParagraphVariation(industrySlug, citySlug) {
  // Build a stable numeric seed from the two slugs
  const key   = industrySlug + '|' + citySlug;
  let   seed  = 0;
  for (let i = 0; i < key.length; i++) seed += key.charCodeAt(i);
  const idx = seed % MARKET_PARAGRAPH_VARIATIONS.length;
  return MARKET_PARAGRAPH_VARIATIONS[idx];
}

/**
 * Build related-city pill links for a given industry, excluding the current city.
 */
function buildRelatedCityLinks(industry, currentCitySlug) {
  return CITIES
    .filter(c => c.slug !== currentCitySlug)
    .map(c =>
      `<li><a href="/calculators/${industry.slug}-lsa-roi-calculator-${c.slug}.html">${c.name}, ${c.state}</a></li>`
    )
    .join('\n          ');
}

/**
 * Build related-industry pill links for a given city, excluding the current industry.
 */
function buildRelatedIndustryLinks(currentIndustrySlug, city) {
  return INDUSTRIES
    .filter(i => i.slug !== currentIndustrySlug)
    .map(i =>
      `<li><a href="/calculators/${i.slug}-lsa-roi-calculator-${city.slug}.html">${i.label} LSA ROI Calculator — ${city.name}</a></li>`
    )
    .join('\n          ');
}

/**
 * Replace all occurrences of a template variable.
 */
function replaceAll(template, variable, value) {
  return template.split(`{{${variable}}}`).join(value);
}

/**
 * Apply all substitutions to the template for a given industry × city combo.
 */
function renderPage(template, industry, city) {
  // Resolve city market data — default to neutral values for unlisted cities
  const cityData = CITY_MARKET_DATA[city.slug] || {
    multiplier:  1,
    competition: 'competitive',
    demand:      'steady demand for home services',
  };

  // Resolve base CPL for this industry and apply city multiplier
  const base    = INDUSTRY_BASE_CPL[industry.slug];
  const cplLow  = Math.round(base.low  * cityData.multiplier);
  const cplHigh = Math.round(base.high * cityData.multiplier);

  // Pick a deterministic paragraph variation for this industry × city combo
  const rawVariation = pickParagraphVariation(industry.slug, city.slug);
  // Apply {{CITY}} and {{INDUSTRY_LABEL}} substitutions inside the variation
  const marketParagraph = rawVariation
    .split('{{CITY}}').join(city.name)
    .split('{{INDUSTRY_LABEL}}').join(industry.label);

  // Resolve city stat sentence — fall back to a generic sentence if not listed
  const cityStat = CITY_STATS[city.slug] ||
    `${city.name} is a growing market with increasing demand for ${industry.label} services.`;

  let html = template;

  html = replaceAll(html, 'INDUSTRY',               industry.slug);
  html = replaceAll(html, 'INDUSTRY_LABEL',         industry.label);
  html = replaceAll(html, 'CITY',                   city.name);
  html = replaceAll(html, 'CITY_SLUG',              city.slug);
  html = replaceAll(html, 'STATE',                  city.state);
  html = replaceAll(html, 'CPL_LOW',                String(cplLow));
  html = replaceAll(html, 'CPL_HIGH',               String(cplHigh));
  html = replaceAll(html, 'CITY_COMPETITION',       cityData.competition);
  html = replaceAll(html, 'CITY_DEMAND',            cityData.demand);
  html = replaceAll(html, 'MARKET_PARAGRAPH',       marketParagraph);
  html = replaceAll(html, 'CITY_STAT',              cityStat);
  html = replaceAll(html, 'RELATED_CITY_LINKS',     buildRelatedCityLinks(industry, city.slug));
  html = replaceAll(html, 'RELATED_INDUSTRY_LINKS', buildRelatedIndustryLinks(industry.slug, city));

  return html;
}

/**
 * Render a single <url> block for the sitemap.
 */
function urlBlock(loc, lastmod, priority, changefreq = 'monthly') {
  return [
    `  <url>`,
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    `  </url>`,
  ].join('\n');
}

// ---------------------------------------------------------------------------
// 10. Main
// ---------------------------------------------------------------------------
function main() {
  // Validate template exists
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`ERROR: Template not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const generatedUrls = [];
  let count = 0;

  for (const industry of INDUSTRIES) {
    for (const city of CITIES) {
      const filename = `${industry.slug}-lsa-roi-calculator-${city.slug}.html`;
      const outPath  = path.join(OUTPUT_DIR, filename);
      // Sitemap URL without .html extension for consistency
      const url      = `${BASE_URL}/calculators/${industry.slug}-lsa-roi-calculator-${city.slug}`;

      const html = renderPage(template, industry, city);
      fs.writeFileSync(outPath, html, 'utf8');

      generatedUrls.push(url);
      count++;
    }
  }

  console.log(`\n✅  Generated ${count} pages into /calculators/\n`);

  // ---------------------------------------------------------------------------
  // Auto-write sitemap-calculators.xml
  // Preserves static hub + industry entries at the top.
  // Appends all 200 city × industry URLs below.
  // ---------------------------------------------------------------------------
  const sitemapPath = path.join(ROOT, 'sitemap-calculators.xml');

  const staticBlocks = STATIC_CALCULATOR_URLS
    .map(u => urlBlock(u.loc, u.lastmod, u.priority))
    .join('\n\n');

  const cityUrlBlocks = generatedUrls
    .map(url => urlBlock(url, TODAY, '0.6'))
    .join('\n\n');

  const newSitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    `  <!-- /calculators/ hub and static industry pages -->`,
    staticBlocks,
    ``,
    `  <!-- City × industry programmatic pages (auto-generated ${TODAY}) -->`,
    cityUrlBlocks,
    ``,
    `</urlset>`,
  ].join('\n');

  fs.writeFileSync(sitemapPath, newSitemap, 'utf8');
  console.log(`✅  sitemap-calculators.xml updated with ${STATIC_CALCULATOR_URLS.length} static + ${generatedUrls.length} city pages.\n`);
}

main();
