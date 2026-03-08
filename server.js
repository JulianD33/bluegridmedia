const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8181;
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.xml': 'application/xml',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  let filePath = path.join(__dirname, url);

  // Directory → index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  // Try adding .html for extensionless URLs
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    const withHtml = filePath + '.html';
    const inBlog = path.join(__dirname, 'blog', path.basename(filePath) + '.html');
    if (fs.existsSync(withHtml)) filePath = withHtml;
    else if (fs.existsSync(inBlog)) filePath = inBlog;
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found'); return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
