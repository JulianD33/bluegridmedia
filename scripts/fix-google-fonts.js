/**
 * fix-google-fonts.js
 * Replace render-blocking Google Fonts link with non-blocking pattern across all HTML files.
 * Reduces Poppins from 5-6 weights to 3 (400, 600, 700) and adds preconnect hints.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// Find all HTML files (excluding .git)
const files = execSync('find . -name "*.html" -not -path "./.git/*"', { cwd: ROOT })
  .toString().trim().split('\n').filter(Boolean);

// The non-blocking replacement block (2-space indent to match most files)
const NON_BLOCKING = [
  '  <link rel="preconnect" href="https://fonts.googleapis.com">',
  '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" media="print" onload="this.media=\'all\'">',
  '  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"></noscript>'
].join('\n');

let updated = 0;
let skipped = 0;
let errors = 0;

files.forEach(relPath => {
  const filePath = path.join(ROOT, relPath.replace(/^\.\//, ''));
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    errors++;
    console.error('ERROR reading: ' + relPath + ' — ' + e.message);
    return;
  }

  const original = content;

  // Skip files with no Poppins font reference
  if (!content.includes('family=Poppins')) {
    skipped++;
    return;
  }

  // Step 1: Remove any existing preconnect hints for googleapis/gstatic
  // Handle both self-closing and non-self-closing, with and without newline
  content = content.replace(/[ \t]*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"[^>]*>\n?/g, '');
  content = content.replace(/[ \t]*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\n?/g, '');

  // Step 2: Remove any existing noscript font fallbacks (to avoid doubling them)
  content = content.replace(/[ \t]*<noscript><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*Poppins[^>]*><\/noscript>\n?/g, '');

  // Step 3: Replace blocking Poppins stylesheet link with non-blocking pattern
  // Handles all weight variants, both with and without self-closing slash, any indent
  const poppinsLinkRegex = /[ \t]*<link[^>]+fonts\.googleapis\.com\/css2[^>]*family=Poppins[^>]*\/?>/g;
  let replaced = false;
  content = content.replace(poppinsLinkRegex, (match) => {
    if (!replaced) {
      replaced = true;
      return NON_BLOCKING;
    }
    // If somehow there were multiple Poppins links, remove the extras
    return '';
  });

  // Step 4: Clean up any double-blank lines introduced by removals
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== original && replaced) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      updated++;
      console.log('Updated: ' + relPath);
    } catch (e) {
      errors++;
      console.error('ERROR writing: ' + relPath + ' — ' + e.message);
    }
  } else if (!replaced) {
    // Had Poppins in content but regex didn't match the link tag — log for inspection
    console.warn('WARN (no link tag found?): ' + relPath);
    skipped++;
  } else {
    skipped++;
  }
});

console.log('\n========================================');
console.log('Google Fonts fix complete');
console.log('  Updated: ' + updated + ' files');
console.log('  Skipped: ' + skipped + ' files (no Poppins or already correct)');
console.log('  Errors:  ' + errors + ' files');
console.log('========================================');
