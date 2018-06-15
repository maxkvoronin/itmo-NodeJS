const http = require('http');
const fs = require('fs'); 
const fileName = "index.html";

let parser = require('./parser.js');
let queryNum = 0;

let server = http.createServer((req, res) => {
 

  fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) return console.log(err);
      else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
      }
  })

  req.on('data', (data) => {
    parser(data, (json) => {
      fs.writeFile(`result${++queryNum}.json`, json, err => {
        if (err) return console.log(err);
        else console.log(`Сервак распарсил входящий файл и записал его в result${queryNum}.json`);
      });
    });
  });

}).listen(8080);
