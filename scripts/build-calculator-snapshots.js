/**
 * Build script: generates static snapshot pages for the LSA ROI Calculator.
 * Run during Netlify deploy (e.g. node scripts/build-calculator-snapshots.js).
 * Output: lsa-roi-calculator-{slug}.html for each high-value industry + market combo.
 * Each snapshot is an indexable page with unique title, description, and OG image
 * targeting long-tail queries like "LSA ROI calculator for plumbers Chicago".
 *
 * Also updates sitemap-index.xml lastmod dates so search engines re-crawl promptly.
 */

const fs   = require('fs');
const path = require('path');

const BASE_URL = 'https://bluegridmedia.com';

const SNAPSHOTS = [
  { slug: 'plumbing-large',                  industry: 'plumbing',                  market: 'large', budget: 2000, jobValue: 450,  title: 'LSA ROI Calculator for Plumbers in Large Markets',           description: 'Estimate cost per lead, booked jobs, and ROAS for plumbing in competitive metros. Free calculator with Plumbing + Large market pre-filled.' },
  { slug: 'plumbing-mid',                    industry: 'plumbing',                  market: 'mid',   budget: 1500, jobValue: 400,  title: 'LSA ROI Calculator for Plumbers (Mid-Size Markets)',          description: 'Free LSA calculator for plumbers in mid-size markets. See your estimated CPL, leads per month, and return on ad spend.' },
  { slug: 'hvac-large',                      industry: 'hvac',                      market: 'large', budget: 2500, jobValue: 500,  title: 'LSA ROI Calculator for HVAC in Large Markets',               description: 'HVAC LSA cost per lead and ROAS calculator for large metros. Pre-filled for HVAC + Large market.' },
  { slug: 'hvac-mid',                        industry: 'hvac',                      market: 'mid',   budget: 1800, jobValue: 400,  title: 'LSA ROI Calculator for HVAC Companies (Mid-Size)',           description: 'Estimate HVAC LSA cost per lead and booked jobs in mid-size markets. Free calculator.' },
  { slug: 'roofing-large',                   industry: 'roofing',                   market: 'large', budget: 3000, jobValue: 8000, title: 'LSA ROI Calculator for Roofers in Competitive Markets',      description: 'Roofing LSA calculator for large metros. Estimate CPL, booked jobs, and ROAS for roofers.' },
  { slug: 'roofing-mid',                     industry: 'roofing',                   market: 'mid',   budget: 2000, jobValue: 6000, title: 'LSA ROI Calculator for Roofers (Mid-Size)',                  description: 'Free LSA ROI calculator for roofers in mid-size markets. Cost per lead and return on ad spend.' },
  { slug: 'electrical-large',                industry: 'electrical',                market: 'large', budget: 1500, jobValue: 350,  title: 'LSA ROI Calculator for Electricians in Large Markets',       description: 'Electrician LSA calculator for competitive metros. Estimate cost per lead and booked jobs.' },
  { slug: 'electrical-mid',                  industry: 'electrical',                market: 'mid',   budget: 1200, jobValue: 320,  title: 'LSA ROI Calculator for Electricians',                        description: 'Free LSA calculator for electricians. Mid-size market pre-filled. CPL, leads, and ROAS in seconds.' },
  { slug: 'pest-control-mid',                industry: 'pest-control',              market: 'mid',   budget: 1200, jobValue: 180,  title: 'LSA ROI Calculator for Pest Control',                        description: 'Pest control LSA cost per lead and ROAS calculator. Includes recurring revenue and LTV.' },
  { slug: 'pest-control-large',              industry: 'pest-control',              market: 'large', budget: 1800, jobValue: 200,  title: 'LSA ROI Calculator for Pest Control (Large Markets)',        description: 'Pest control LSA calculator for large metros. Estimate CPL and LTV-adjusted ROAS.' },
  { slug: 'landscaping-mid',                 industry: 'landscaping',               market: 'mid',   budget: 800,  jobValue: 250,  title: 'LSA ROI Calculator for Landscaping & Lawn Care',             description: 'Lawn care and landscaping LSA calculator. Mid-size market. Cost per lead and booked jobs.' },
  { slug: 'water-damage-restoration-large',  industry: 'water-damage-restoration',  market: 'large', budget: 2500, jobValue: 5000, title: 'LSA ROI Calculator for Water Damage Restoration',            description: 'Water damage restoration LSA calculator for large markets. Estimate CPL and ROAS.' },
  { slug: 'general-contractors-mid',         industry: 'general-contractors',       market: 'mid',   budget: 2000, jobValue: 4500, title: 'LSA ROI Calculator for General Contractors',                 description: 'General contractors LSA calculator. Mid-size market. Cost per lead and return on ad spend.' },
  { slug: 'lawyers-large',                   industry: 'lawyers',                   market: 'large', budget: 5000, jobValue: 3000, title: 'LSA ROI Calculator for Lawyers (Large Markets)',             description: 'Lawyer LSA calculator for competitive metros. High CPL; estimate leads and ROAS.' },
  { slug: 'dentists-mid',                    industry: 'dentists',                  market: 'mid',   budget: 2000, jobValue: 800,  title: 'LSA ROI Calculator for Dentists',                            description: 'Dentist LSA cost per lead and ROAS calculator. Mid-size market pre-filled.' },
];

/* ── Meta replacement ───────────────────────────────────────────────────────── */

function replaceMeta(html, snapshot) {
  const slug    = snapshot.slug;
  const url     = `${BASE_URL}/lsa-roi-calculator-${slug}.html`;
  const ogImage = `${BASE_URL}/assets/images/calculator-og/${slug}.png`;

  let out = html;

  out = out.replace(
    /<title>[^<]*<\/title>/,
    `<title>${snapshot.title} | Blue Grid Media</title>`
  );
  out = out.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${snapshot.description.replace(/"/g, '&quot;')}">`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*" *\/>/,
    `<link rel="canonical" href="${url}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*" *\/>/,
    `<meta property="og:title" content="${(snapshot.title + ' | Blue Grid Media').replace(/"/g, '&quot;')}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*" *\/>/,
    `<meta property="og:description" content="${snapshot.description.replace(/"/g, '&quot;')}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*" *\/>/,
    `<meta property="og:url" content="${url}" />`
  );
  if (out.indexOf('og:image') === -1) {
    out = out.replace(
      /<meta property="og:site_name"/,
      `<meta property="og:image" content="${ogImage}" />\n  <meta property="og:site_name"`
    );
  } else {
    out = out.replace(
      /<meta property="og:image" content="[^"]*" *\/>/,
      `<meta property="og:image" content="${ogImage}" />`
    );
  }
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*" *\/>/,
    `<meta name="twitter:title" content="${(snapshot.title + ' | Blue Grid Media').replace(/"/g, '&quot;')}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*" *\/>/,
    `<meta name="twitter:description" content="${snapshot.description.replace(/"/g, '&quot;')}" />`
  );
  if (out.indexOf('twitter:image') === -1) {
    out = out.replace(
      /<meta name="twitter:description" content="[^"]*" *\/>/,
      (m) => m + '\n  <meta name="twitter:image" content="' + ogImage + '" />'
    );
  }

  const snapshotScript = `<script>window.__LSA_SNAPSHOT = ${JSON.stringify({
    industry: snapshot.industry,
    market:   snapshot.market,
    budget:   snapshot.budget,
    jobValue: snapshot.jobValue,
  })};</script>\n  `;
  out = out.replace(/<body>\s*/, '<body>\n  ' + snapshotScript);

  return out;
}

/* ── Sitemap index lastmod update ───────────────────────────────────────────── */

function updateSitemapIndex(root) {
  const indexPath = path.join(root, 'sitemap-index.xml');
  if (!fs.existsSync(indexPath)) {
    console.log('sitemap-index.xml not found — skipping lastmod update.');
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  let content = fs.readFileSync(indexPath, 'utf8');

  // Replace all <lastmod> values inside the index with today's date
  content = content.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`Updated sitemap-index.xml lastmod dates to ${today}.`);
}

/* ── Main ───────────────────────────────────────────────────────────────────── */

function main() {
  const root       = path.resolve(__dirname, '..');
  const sourcePath = path.join(root, 'lsa-roi-calculator.html');

  if (!fs.existsSync(sourcePath)) {
    console.error('ERROR: lsa-roi-calculator.html not found at', sourcePath);
    process.exit(1);
  }

  const html = fs.readFileSync(sourcePath, 'utf8');

  // Generate snapshot pages
  SNAPSHOTS.forEach((snapshot) => {
    const outHtml = replaceMeta(html, snapshot);
    const outPath = path.join(root, `lsa-roi-calculator-${snapshot.slug}.html`);
    fs.writeFileSync(outPath, outHtml, 'utf8');
    console.log('Wrote', outPath);
  });

  // Keep sitemap-index.xml lastmod fresh
  updateSitemapIndex(root);

  console.log(`\nDone. Generated ${SNAPSHOTS.length} snapshot pages.`);
}

main();
