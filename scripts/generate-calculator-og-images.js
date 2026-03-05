/**
 * Generates OG images for LSA ROI Calculator snapshot pages.
 * Output: SVG files in assets/images/calculator-og/{slug}.svg
 * OG size 1200x630. Convert to PNG for social (e.g. sharp, ImageMagick, or online tool).
 * Run: node scripts/generate-calculator-og-images.js
 */

const fs = require('fs');
const path = require('path');

const SNAPSHOTS = [
  { slug: 'plumbing-large', title: 'LSA ROI Calculator for Plumbers' },
  { slug: 'plumbing-mid', title: 'LSA ROI Calculator for Plumbers' },
  { slug: 'hvac-large', title: 'LSA ROI Calculator for HVAC' },
  { slug: 'hvac-mid', title: 'LSA ROI Calculator for HVAC' },
  { slug: 'roofing-large', title: 'LSA ROI Calculator for Roofers' },
  { slug: 'roofing-mid', title: 'LSA ROI Calculator for Roofers' },
  { slug: 'electrical-large', title: 'LSA ROI Calculator for Electricians' },
  { slug: 'electrical-mid', title: 'LSA ROI Calculator for Electricians' },
  { slug: 'pest-control-mid', title: 'LSA ROI Calculator for Pest Control' },
  { slug: 'pest-control-large', title: 'LSA ROI Calculator for Pest Control' },
  { slug: 'landscaping-mid', title: 'LSA ROI Calculator for Landscaping' },
  { slug: 'water-damage-restoration-large', title: 'LSA ROI Calculator for Water Damage' },
  { slug: 'general-contractors-mid', title: 'LSA ROI Calculator for Contractors' },
  { slug: 'lawyers-large', title: 'LSA ROI Calculator for Lawyers' },
  { slug: 'dentists-mid', title: 'LSA ROI Calculator for Dentists' },
];

const W = 1200;
const H = 630;

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugToLabel(slug) {
  const parts = slug.split('-');
  if (parts[parts.length - 1] === 'large') {
    parts.pop();
    return parts.join(' ').replace(/\b\w/g, (c) => c.toUpperCase()) + ' — Large Markets';
  }
  if (parts[parts.length - 1] === 'mid') {
    parts.pop();
    return parts.join(' ').replace(/\b\w/g, (c) => c.toUpperCase()) + ' — Mid-Size';
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function createSvg(snapshot) {
  const label = slugToLabel(snapshot.slug);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f2d4e"/>
      <stop offset="100%" style="stop-color:#0ea5a4"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <text x="${W/2}" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">${escapeXml(label)}</text>
  <text x="${W/2}" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)">Free LSA ROI Calculator</text>
  <text x="${W/2}" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">Blue Grid Media</text>
</svg>`;
}

function main() {
  const root = path.resolve(__dirname, '..');
  const outDir = path.join(root, 'assets', 'images', 'calculator-og');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  SNAPSHOTS.forEach((snapshot) => {
    const svg = createSvg(snapshot);
    const outPath = path.join(outDir, `${snapshot.slug}.svg`);
    fs.writeFileSync(outPath, svg, 'utf8');
    console.log('Wrote', outPath);
  });

  console.log('Done. To get PNGs for OG (many platforms prefer PNG), convert SVGs with e.g. ImageMagick: convert slug.svg slug.png');
}

main();
