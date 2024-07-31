const fs = require('fs');
const path = require('path');

async function handleRequest(req, res) {
 if (req.method === 'GET' && req.url.startsWith(`/assets/`)) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File Not Found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = handleRequest;
