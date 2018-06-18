const http = require('http');
let generateKey = require('./functions.js').generateKey;
let checkParams = require('./functions.js').checkParams;

let server = http.createServer().listen(8080);
let keys = new Array();

server.on('request', (req, res) => {

  res.writeHead(200, {'Content-Type' : 'application/json',
                      'Access-Control-Allow-Origin': '*'
  });

  if (req.headers['content-type'] === undefined) {
    let keyObj = generateKey();
    keys.push(keyObj['key']);

    res.end(JSON.stringify(keyObj));
  }

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    var data = new String();

    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    
    req.on('end', () => {
      var params = new Object();
      params = JSON.parse(data);

      var result = new Object();
      
      if (checkParams(params)) {
        if (params['method'] === 'send_lead') {
          result['status'] = 'success';
          result['message'] = 'lead was successfully sent';
          result['key'] = params['key'];

          delete params['method'];
          delete params['key'];
          
          result['data'] = params;
        } else

        if (params['method'] === 'get_api_key') {
          result['status'] = 'success';
          result['key'] = params['key'];

        } else {
          result['status'] = 'error';
          result['message'] = 'unknown method';
        }

        if (!keys.includes(result['key'])) {
          result['status'] = 'error';
          result['message'] = 'invalid key';
        }
      }
      else {
        result['status'] = 'error';
        result['message'] = 'missing parameter';
      }

      res.end(JSON.stringify(result));
    });
  }

});
