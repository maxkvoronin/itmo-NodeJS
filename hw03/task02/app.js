const http = require('http');
const url = require('url');

let Converter = require('./Converter.js');

let server = http.createServer().listen(8080);

server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/plain'})

  let funcName = url.parse(req.url).pathname.slice(1);
  let params = url.parse(req.url, true).query.name;

  let myfunc = new Converter();

  if (funcName === "camel_to_snake")
    res.end(myfunc.camel_to_snake(params));
  if (funcName === "snake_to_camel")
    res.end(myfunc.snake_to_camel(params));

});