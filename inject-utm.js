const fs = require('fs');
const path = require('path');
const tag = '<script src="/utm-tracker.js"></script>';

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(e => {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '.git', 'calculators'].includes(e.name)) {
      processDir(full);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      let txt = fs.readFileSync(full, 'utf8');
      if (txt.includes('utm-tracker.js')) return; // already has it
      if (!txt.includes('</body>')) return;        // safety check
      txt = txt.replace('</body>', tag + '\n</body>');
      fs.writeFileSync(full, txt, 'utf8');
      console.log('OK ' + e.name);
    }
  });
}

processDir('.');
console.log('Done');
