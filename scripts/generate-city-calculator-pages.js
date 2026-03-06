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
 *   Console output: list of all generated URLs for sitemap inclusion.
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
// 3. Paths
// ---------------------------------------------------------------------------
const ROOT          = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'calculator-city-template.html');
const OUTPUT_DIR    = path.join(ROOT, 'calculators');
const TODAY         = new Date().toISOString().slice(0, 10);
const BASE_URL      = 'https://bluegridmedia.com';

// ---------------------------------------------------------------------------
// 4. Helpers
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

  html = replaceAll(html, 'INDUSTRY',       industry.slug);
  html = replaceAll(html, 'INDUSTRY_LABEL', industry.label);
  html = replaceAll(html, 'CITY',           city.name);
  html = replaceAll(html, 'CITY_SLUG',      city.slug);
  html = replaceAll(html, 'STATE',          city.state);
  html = replaceAll(html, 'RELATED_CITY_LINKS', buildRelatedCityLinks(industry, city.slug));

  return html;
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------
function main() {
  // Validate template exists
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`ERROR: Template not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  // Validate output directory exists
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

  // ---------------------------------------------------------------------------
  // 6. Console output — all URLs for sitemap inclusion
  // ---------------------------------------------------------------------------
  console.log(`\n✅  Generated ${count} pages into /calculators/\n`);
  console.log('--- SITEMAP URLS (paste into sitemap-calculators.xml) ---\n');

  for (const url of generatedUrls) {
    console.log(`  <url>`);
    console.log(`    <loc>${url}</loc>`);
    console.log(`    <lastmod>${TODAY}</lastmod>`);
    console.log(`    <changefreq>monthly</changefreq>`);
    console.log(`    <priority>0.6</priority>`);
    console.log(`  </url>`);
    console.log('');
  }

  console.log('--- END SITEMAP URLS ---\n');

  // ---------------------------------------------------------------------------
  // 7. Auto-write sitemap-calculators.xml
  // ---------------------------------------------------------------------------
  const sitemapPath = path.join(ROOT, 'sitemap-calculators.xml');

  // Read existing sitemap to preserve the static industry pages at the top
  let existingContent = '';
  if (fs.existsSync(sitemapPath)) {
    existingContent = fs.readFileSync(sitemapPath, 'utf8');
  }

  // Extract existing static <url> blocks (non-city pages) to preserve them
  const staticUrlRegex = /<url>[\s\S]*?<\/url>/g;
  const allExistingUrls = existingContent.match(staticUrlRegex) || [];

  // Keep only the static industry calculator pages (no city slug in the URL)
  const citySlugPattern = new RegExp(CITIES.map(c => c.slug).join('|'));
  const staticUrls = allExistingUrls.filter(block => !citySlugPattern.test(block));

  // Build new city URL blocks (no .html extension)
  const cityUrlBlocks = generatedUrls.map(url => [
    `  <url>`,
    `    <loc>${url}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>monthly</changefreq>`,
    `    <priority>0.6</priority>`,
    `  </url>`,
  ].join('\n')).join('\n\n');

  const newSitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    `  <!-- Static industry calculator pages -->`,
    staticUrls.join('\n\n'),
    ``,
    `  <!-- City × industry programmatic pages (auto-generated ${TODAY}) -->`,
    cityUrlBlocks,
    ``,
    `</urlset>`,
  ].join('\n');

  fs.writeFileSync(sitemapPath, newSitemap, 'utf8');
  console.log(`✅  sitemap-calculators.xml updated with ${generatedUrls.length} city pages.\n`);
}

main();
