const http = require('http');
let server = http.createServer().listen(8080);

let calc = require('./calc.js').calc;
let convert = require('./calc.js').convert;

server.on('request', (req, res) => {
  let data = new String();

  res.writeHead(200, {'Content-Type' : 'application/json',
                      'Access-Control-Allow-Origin': '*'
  });
  
  req.on('data', (chunk) => {
    data += chunk.toString();
  });
  
  req.on('end', () => {
    
    let opn = convert(JSON.parse(data)['value']);
    let result = calc(opn);

    let message = {
      request_str: JSON.parse(data)['value'],
      opn_str: opn,
      calc_value: result
    }

    res.end(JSON.stringify(message));
  });

  
});