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
// 5. Industry guide URLs — links to the blog post for each industry
// ---------------------------------------------------------------------------
const INDUSTRY_GUIDE_URL = {
  'hvac':             '/google-lsa-for-hvac-companies',
  'plumbing':         '/plumbing-ads-playbook-google-local-services-ads',
  'electrician':      '/google-lsa-for-electricians',
  'roofing':          '/google-lsa-for-roofers',
  'pest-control':     '/google-lsa-for-pest-control',
  'landscaping':      '/google-lsa-for-landscaping',
  'tree-service':     '/google-lsa-for-tree-service',
  'carpet-cleaning':  '/google-lsa-for-carpet-cleaning',
  'appliance-repair': '/google-lsa-for-appliance-repair',
  'garage-door':      '/garage-door-local-services-ads',
};

// ---------------------------------------------------------------------------
// 6. Market paragraph variations — one is selected per page for uniqueness  (was §5)
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
// 7. Industry content blocks — one paragraph per industry explaining LSA fit
// ---------------------------------------------------------------------------
const INDUSTRY_CONTENT_BLOCKS = {
  'appliance-repair': 'Appliance repair companies frequently rely on urgent service calls when homeowners experience broken appliances, making Google Local Services Ads a strong source of inbound leads.',
  'hvac':             'Heating and cooling companies often rely on emergency repair calls, which makes Google Local Services Ads especially valuable for capturing high-intent leads from homeowners searching for immediate help.',
  'plumbing':         'Plumbing companies frequently receive emergency service requests, which makes Google Local Services Ads an effective way to capture homeowners searching for urgent repairs.',
  'roofing':          'Roofing companies often rely on storm damage inspections and urgent repairs, making Google Local Services Ads a powerful channel for capturing high-intent homeowner searches.',
  'electrician':      'Electrical service calls often require quick response times, and Local Services Ads allow electricians to appear prominently when homeowners search for licensed professionals.',
  'pest-control':     'Pest control companies benefit from Local Services Ads because homeowners frequently search for immediate solutions when dealing with infestations or recurring pest problems.',
  'landscaping':      'Landscaping companies often use Local Services Ads to capture homeowners looking for yard maintenance, seasonal cleanups, or outdoor improvement projects.',
  'tree-service':     'Tree service companies frequently receive urgent calls for fallen or hazardous trees, and Local Services Ads can help capture these high-intent searches.',
  'carpet-cleaning':  'Carpet cleaning companies often rely on homeowners searching online for trusted local providers, making Local Services Ads an effective lead generation channel.',
  'garage-door':      'Garage door issues often require immediate repair, which makes Local Services Ads an effective way for technicians to capture high-intent homeowner searches.',
};

// ---------------------------------------------------------------------------
// 8. City content blocks — one paragraph per city explaining local LSA demand
// ---------------------------------------------------------------------------
const CITY_CONTENT_BLOCKS = {
  'new-york':      'New York City homeowners turn to Google Local Services Ads when they need fast, reliable service providers. With one of the densest housing markets in the country, demand for verified contractors is constant — and competition among service businesses makes profile optimization critical.',
  'los-angeles':   'In Los Angeles, homeowners frequently search Google for trusted local contractors across a sprawling metro with millions of residential properties. Local Services Ads are especially effective here because buyers expect credentialed, Google-verified businesses before making a call.',
  'chicago':       'Chicago homeowners rely heavily on Google searches to find home service professionals, particularly during extreme weather seasons when HVAC, plumbing, and roofing demand spike. LSA placements at the top of search results give contractors a strong advantage in this market.',
  'houston':       "Houston's large and growing residential base generates steady search volume for local service companies year-round. Homeowners in the greater Houston area frequently search Google when they need fast, qualified contractors — making Local Services Ads a reliable lead channel.",
  'phoenix':       "Phoenix's rapid population growth has created strong, consistent demand for home services across all industries. Homeowners in the Valley of the Sun search Google regularly for contractors, and Local Services Ads give verified businesses prominent visibility at the moment of need.",
  'philadelphia':  'Philadelphia homeowners often search Google for licensed, trustworthy service providers, particularly in older neighborhoods where maintenance and repair needs are frequent. Local Services Ads help contractors build visibility and credibility in this densely populated market.',
  'san-antonio':   "San Antonio's expanding residential communities have increased demand for home service professionals. Local homeowners regularly search Google for contractors, and the Google Guaranteed badge helps businesses stand out in a market where trust is a major purchasing factor.",
  'san-diego':     "San Diego's large homeowner population and year-round mild climate keep demand for contractors steady. Homeowners in the San Diego metro frequently search Google for local service providers, and Local Services Ads deliver leads at the top of search before organic results.",
  'dallas':        "Dallas is one of the fastest-growing metro areas in the country, with thousands of new homeowners searching Google for service contractors each month. Local Services Ads connect businesses with this high-intent audience at the exact moment they're ready to book.",
  'san-jose':      "San Jose homeowners in the Silicon Valley area are accustomed to digital-first service discovery and frequently search Google for verified, background-checked contractors. Local Services Ads are particularly effective here because the tech-savvy market responds well to Google's credentialing process.",
  'austin':        "Austin's booming population growth means thousands of new residents are searching Google for home service providers every month. The competitive Austin market rewards contractors who maintain strong Google Guaranteed profiles and fast response times in Local Services Ads.",
  'jacksonville':  "Jacksonville's spread-out residential landscape means homeowners depend on Google to find local service providers across a large geographic area. Local Services Ads help contractors target specific neighborhoods and capture leads from homeowners searching for nearby professionals.",
  'fort-worth':    "Fort Worth is one of the fastest-growing cities in the Dallas-Fort Worth metroplex, with a steady stream of new homeowners searching Google for trusted contractors. Local Services Ads give businesses prominent placement when these high-intent searches happen.",
  'columbus':      "Columbus homeowners frequently search Google when they need local service companies, particularly during weather-driven spikes in HVAC, roofing, and plumbing demand. Local Services Ads place verified contractors at the top of results when these searches occur.",
  'charlotte':     "Charlotte's rapid residential growth has created strong, sustained demand for home service professionals. Homeowners regularly search Google for contractors and expect to see Google-verified businesses — making Local Services Ads a key part of lead generation in this market.",
  'indianapolis':  "Indianapolis homeowners rely on Google to find trusted local contractors, especially during Midwest weather events that drive urgent service needs. Local Services Ads help businesses capture leads at the top of search results when demand is highest.",
  'san-francisco': "San Francisco homeowners expect Google-verified, credentialed service providers and will search online before calling anyone. The San Francisco market is one of the most competitive in the country, making a strong Local Services Ads profile essential for standing out.",
  'seattle':       "Seattle homeowners are highly digital in how they search for and evaluate local service providers. The Pacific Northwest market has strong demand for home services year-round, and Local Services Ads allow contractors to appear prominently in Google searches at the moment homeowners are ready to act.",
  'denver':        "Denver's rapidly growing residential base and outdoor-focused lifestyle keep demand for home services strong year-round. Homeowners in the Denver metro frequently search Google for contractors and respond well to the Google Guaranteed credentialing that Local Services Ads provide.",
  'nashville':     "Nashville's booming growth has brought thousands of new homeowners into the market, all searching Google for trusted local contractors. Local Services Ads give businesses a way to reach these new residents early in their search, before they find a competitor.",
};

// ---------------------------------------------------------------------------
// 9. Static hub + industry pages that live in sitemap-calculators.xml
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
  html = replaceAll(html, 'INDUSTRY_GUIDE_URL',     INDUSTRY_GUIDE_URL[industry.slug] || '/resources');
  html = replaceAll(html, 'RELATED_CITY_LINKS',     buildRelatedCityLinks(industry, city.slug));
  html = replaceAll(html, 'RELATED_INDUSTRY_LINKS', buildRelatedIndustryLinks(industry.slug, city));

  // New unique content blocks — industry × city
  const industryBlock = INDUSTRY_CONTENT_BLOCKS[industry.slug] ||
    `${industry.label} companies use Google Local Services Ads to connect with homeowners searching for trusted local providers.`;
  const cityBlock = CITY_CONTENT_BLOCKS[city.slug] ||
    `${city.name} homeowners frequently search Google for local service professionals, making Local Services Ads an effective lead channel for contractors in this market.`;

  html = replaceAll(html, 'INDUSTRY_CONTENT_BLOCK', industryBlock);
  html = replaceAll(html, 'CITY_CONTENT_BLOCK',     cityBlock);

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
