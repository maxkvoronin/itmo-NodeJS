const http = require('http');
const url = require('url');

let server = http.createServer().listen(8080);

server.on('request', (req, res) => {
  process.send(url.parse(req.url, true).query.code);
  server.close();
});