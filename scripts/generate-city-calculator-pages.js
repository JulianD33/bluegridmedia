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
// 6a. Industry content blocks — unique paragraph explaining LSA demand per trade
// ---------------------------------------------------------------------------
const INDUSTRY_CONTENT_BLOCKS = {
  'appliance-repair':  'Appliance repair companies frequently rely on urgent service calls when homeowners experience broken appliances, making Google Local Services Ads a strong source of inbound leads.',
  'hvac':              'Heating and cooling companies often rely on emergency repair calls, which makes Google Local Services Ads especially valuable for capturing high-intent leads from homeowners searching for immediate help.',
  'plumbing':          'Plumbing companies frequently receive emergency service requests, which makes Google Local Services Ads an effective way to capture homeowners searching for urgent repairs.',
  'roofing':           'Roofing companies often rely on storm damage inspections and urgent repairs, making Google Local Services Ads a powerful channel for capturing high-intent homeowner searches.',
  'electrician':       'Electrical service calls often require quick response times, and Local Services Ads allow electricians to appear prominently when homeowners search for licensed professionals.',
  'pest-control':      'Pest control companies benefit from Local Services Ads because homeowners frequently search for immediate solutions when dealing with infestations or recurring pest problems.',
  'landscaping':       'Landscaping companies often use Local Services Ads to capture homeowners looking for yard maintenance, seasonal cleanups, or outdoor improvement projects.',
  'tree-service':      'Tree service companies frequently receive urgent calls for fallen or hazardous trees, and Local Services Ads can help capture these high-intent searches.',
  'carpet-cleaning':   'Carpet cleaning companies often rely on homeowners searching online for trusted local providers, making Local Services Ads an effective lead generation channel.',
  'garage-door':       'Garage door issues often require immediate repair, which makes Local Services Ads an effective way for technicians to capture high-intent homeowner searches.',
};

// ---------------------------------------------------------------------------
// 6b. City content blocks — unique paragraph explaining local search behavior
// ---------------------------------------------------------------------------
const CITY_CONTENT_BLOCKS = {
  'new-york':      'New York homeowners deal with aging housing stock, extreme weather swings, and limited time — which means they turn to Google the moment something breaks. The sheer volume of searches in the New York metro makes LSA one of the highest-opportunity markets in the country, though it also demands a competitive budget and an airtight profile.',
  'los-angeles':   'Los Angeles spans dozens of distinct neighborhoods and micro-markets, from dense urban corridors to sprawling suburban communities. Homeowners here rely heavily on Google when evaluating local service providers, and LSA positions your business at the very top of search results before organic listings or ads.',
  'chicago':       'Chicago homeowners contend with brutal winters, ageing infrastructure, and a strong DIY culture that eventually gives way to professional help. Seasonal spikes in HVAC, plumbing, and roofing demand make LSA especially powerful in the Chicago market, where urgency drives high conversion rates.',
  'houston':       'Houston\'s rapid suburban expansion and hot, humid climate create year-round demand for home services. Homeowners in greater Houston are accustomed to searching Google for vetted local contractors, and the Google Guaranteed badge carries significant trust in a market where word-of-mouth still matters.',
  'phoenix':       'Phoenix homeowners search for service providers online at some of the highest rates in the country, driven by intense summer heat and a growing population that relies on digital channels to find contractors fast. LSA reaches these high-intent searchers at the exact moment they are ready to book.',
  'philadelphia':  'Philadelphia\'s dense rowhouse neighborhoods and older housing stock generate consistent demand for plumbing, HVAC, and electrical services. Homeowners in the Philly metro tend to research providers carefully before calling, making the trust signals embedded in LSA — like reviews and the Google badge — especially influential.',
  'san-antonio':   'San Antonio\'s booming population growth has outpaced the local contractor supply in several trades, creating strong demand and favorable CPL dynamics for businesses running Local Services Ads. Homeowners here frequently use Google to find qualified providers, especially for urgent and emergency calls.',
  'san-diego':     'San Diego homeowners are protective of their high-value properties and typically research service providers thoroughly before committing. The Google Guaranteed badge reduces friction significantly in this market, and LSA positions your business ahead of competitors in a metro where trust and professionalism are non-negotiable.',
  'dallas':        'Dallas is one of the fastest-growing business hubs in the US, with thousands of new homeowners entering the market each year. Local Services Ads give contractors a direct line to these buyers at the moment of highest intent, and the Dallas metro\'s competitive landscape rewards businesses that invest in profile optimization and review generation.',
  'san-jose':      'San Jose homeowners expect premium service and professional follow-through, reflecting the high-income, tech-oriented demographics of Silicon Valley. LSA connects you with these high-value clients at the top of search, and a well-maintained Google Guaranteed profile can command a premium CPL that converts into high job values.',
  'austin':        'Austin\'s explosive growth means thousands of new residents are still establishing contractor relationships — a significant opportunity for LSA-active businesses. Homeowners in Austin are digitally savvy and trust Google\'s vetting process, making the Google Guaranteed badge a strong differentiator in a crowded and fast-growing market.',
  'jacksonville':  'Jacksonville\'s geographic spread across one of the largest city footprints in the US means homeowners often struggle to find nearby, available contractors quickly. LSA solves this by surfacing your business to searchers in your specific service area, making it one of the most targeted lead channels available in the Jacksonville market.',
  'fort-worth':    'Fort Worth\'s continued expansion as part of the DFW metroplex has created a large and growing homeowner base actively searching for reliable service providers. Local Services Ads give Fort Worth contractors visibility at the exact moment homeowners search, and the competitive landscape rewards fast response times and strong review scores.',
  'columbus':      'Columbus has emerged as one of the Midwest\'s most dynamic metros, with a diverse population of students, young professionals, and established homeowners generating consistent demand for local services. Google Local Services Ads are increasingly the first stop for Columbus homeowners searching for trusted contractors.',
  'charlotte':     'Charlotte\'s rapid growth in the banking and tech sectors has brought an influx of new residents who rely on Google to find contractors in an unfamiliar market. LSA positions your business prominently for these high-intent searches, and the Charlotte metro\'s competitive but not saturated landscape offers strong ROI for well-optimized profiles.',
  'indianapolis':  'Indianapolis homeowners are practical and price-conscious, and they use Google to find service providers who combine fair pricing with verified credentials. The Google Guaranteed badge resonates strongly in the Indy market, and LSA gives local contractors a competitive edge over national aggregator platforms.',
  'san-francisco':  'San Francisco is one of the most competitive service markets in the country, with homeowners willing to pay premium rates for trusted, vetted providers. LSA positions your business at the absolute top of search — above every organic result and standard ad — which is critical in a market where consumer expectations are high and competition is fierce.',
  'seattle':       'Seattle\'s tech-heavy population is comfortable researching service providers online and places significant weight on reviews and verified credentials. Local Services Ads capture homeowners at the top of their search journey, and in a market known for its wet climate and older housing stock, demand for skilled trades remains consistently strong.',
  'denver':        'Denver homeowners face both the demands of mountain weather and a rapidly growing city, creating year-round need for home services across nearly every trade. The Google Guaranteed badge carries strong trust in the Denver market, and LSA allows local contractors to compete effectively against both national brands and established local players.',
  'nashville':     'Nashville\'s ongoing residential boom has created a steady stream of new homeowners who are unfamiliar with the local contractor landscape and rely heavily on Google to make informed decisions. LSA positions your business front and center for these searches, and Nashville\'s moderately competitive market means strong ROI is achievable without an outsized budget.',
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

  // Resolve new content blocks — fall back to generic if slug not found
  const industryContentBlock = INDUSTRY_CONTENT_BLOCKS[industry.slug] ||
    `${industry.label} companies use Google Local Services Ads to reach homeowners searching for local professionals.`;
  const cityContentBlock = CITY_CONTENT_BLOCKS[city.slug] ||
    `Homeowners in ${city.name} rely on Google to find trusted local service providers, making Local Services Ads a strong lead generation channel for businesses operating in this market.`;

  html = replaceAll(html, 'INDUSTRY',                industry.slug);
  html = replaceAll(html, 'INDUSTRY_LABEL',          industry.label);
  html = replaceAll(html, 'CITY',                    city.name);
  html = replaceAll(html, 'CITY_SLUG',               city.slug);
  html = replaceAll(html, 'STATE',                   city.state);
  html = replaceAll(html, 'CPL_LOW',                 String(cplLow));
  html = replaceAll(html, 'CPL_HIGH',                String(cplHigh));
  html = replaceAll(html, 'CITY_COMPETITION',        cityData.competition);
  html = replaceAll(html, 'CITY_DEMAND',             cityData.demand);
  html = replaceAll(html, 'MARKET_PARAGRAPH',        marketParagraph);
  html = replaceAll(html, 'CITY_STAT',               cityStat);
  html = replaceAll(html, 'INDUSTRY_GUIDE_URL',      INDUSTRY_GUIDE_URL[industry.slug] || '/resources');
  html = replaceAll(html, 'INDUSTRY_CONTENT_BLOCK',  industryContentBlock);
  html = replaceAll(html, 'CITY_CONTENT_BLOCK',      cityContentBlock);
  html = replaceAll(html, 'RELATED_CITY_LINKS',      buildRelatedCityLinks(industry, city.slug));
  html = replaceAll(html, 'RELATED_INDUSTRY_LINKS',  buildRelatedIndustryLinks(industry.slug, city));

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
