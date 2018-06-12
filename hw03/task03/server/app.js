const http = require('http');
const json = require('./data.json');

let server = http.createServer().listen(8080);

server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'application/json',
                      'Access-Control-Allow-Origin': '*'
  })
  
  res.end(JSON.stringify(json[Math.floor(Math.random()*json.length)]));
})