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
// 3. Static hub + industry pages that live in sitemap-calculators.xml
//    (kept here so the script can re-write the full file without losing them)
// ---------------------------------------------------------------------------
const STATIC_CALCULATOR_URLS = [
  { loc: 'https://bluegridmedia.com/calculators/',                              lastmod: '2026-05-01', priority: '0.8' },
  { loc: 'https://bluegridmedia.com/calculators/hvac-lsa-roi-calculator',       lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/plumbing-lsa-roi-calculator',   lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/electrician-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/roofing-lsa-roi-calculator',    lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/pest-control-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/garage-door-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/landscaping-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/tree-service-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/carpet-cleaning-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
  { loc: 'https://bluegridmedia.com/calculators/appliance-repair-lsa-roi-calculator',lastmod: '2026-05-01', priority: '0.7' },
];

// ---------------------------------------------------------------------------
// 4. Paths
// ---------------------------------------------------------------------------
const ROOT          = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'calculator-city-template.html');
const OUTPUT_DIR    = path.join(ROOT, 'calculators');
const TODAY         = new Date().toISOString().slice(0, 10);
const BASE_URL      = 'https://bluegridmedia.com';

// ---------------------------------------------------------------------------
// 5. Helpers
// ---------------------------------------------------------------------------

/**
 * Build the related-city pill links for a given industry,
 * excluding the current city.
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
 * Replace all occurrences of a template variable.
 */
function replaceAll(template, variable, value) {
  return template.split(`{{${variable}}}`).join(value);
}

/**
 * Apply all substitutions to the template for a given industry × city combo.
 */
function renderPage(template, industry, city) {
  let html = template;

  html = replaceAll(html, 'INDUSTRY',           industry.slug);
  html = replaceAll(html, 'INDUSTRY_LABEL',     industry.label);
  html = replaceAll(html, 'CITY',               city.name);
  html = replaceAll(html, 'CITY_SLUG',          city.slug);
  html = replaceAll(html, 'STATE',              city.state);
  html = replaceAll(html, 'RELATED_CITY_LINKS', buildRelatedCityLinks(industry, city.slug));

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
// 6. Main
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
  // 7. Auto-write sitemap-calculators.xml
  //    Preserves static hub + industry entries at the top.
  //    Appends all 200 city × industry URLs below.
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
