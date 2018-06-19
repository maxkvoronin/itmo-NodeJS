const http = require('http');
const fs = require('fs');
let generateKey = require('./generateKеy');

let AuthKeys = new Array();

let server = http.createServer((req, res) => {

  if (req.method === 'POST') {
    res.writeHead(200, {'Content-Type' : 'application/json',
                        'Access-Control-Allow-Origin': '*'
    });

    var data = new String();

    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    
    req.on('end', () => {
      let params = JSON.parse(data);
      let answer = new Object();

      if (params.method === 'get_api_key') {
        answer = generateKey();      
        answer['ip'] = req.connection.remoteAddress;

        AuthKeys.push(answer.key);

        res.end(JSON.stringify(answer));
      } else 
      
      if (params.method === 'send_lead') {
          if (AuthKeys.includes(params.key)) {

          answer = {
            status: 'success',
            message : 'lead was successfully sent',
            key : params.key
          }
        
          delete params.key;
          delete params.method;
          answer.data = params

        } else {
          answer.status = 'error';
          answer.message = 'unknown key';
        }
        
      } else {
        answer.status = 'error';
        answer.message = 'unknown method';
      }

      res.end(JSON.stringify(answer));
    });
  }

  else {
    fs.readFile('./public/sample.html', 'utf8', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    })
  }
}).listen(8080);

