const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8181;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';

  let filePath = path.join(__dirname, url);

  // If no extension, try .html
  if (!path.extname(filePath)) {
    filePath += '.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
