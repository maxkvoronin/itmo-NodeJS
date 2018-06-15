const http = require('http');
const fs = require('fs'); 
const fileName = "index.html";

let parser = require('./parser.js');
let i = 0;

let server = http.createServer((req, res) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
      if (err)
          console.log('Не могу открыть файл' );
      else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
      }
  })
}).listen(8080);


server.on('request', (req, res) => {
  req.on('data', (data) => {
    parser(data.toString().split('\n'), json => {
      fs.writeFile(`result${++i}.json`, json, err => {
        if (err) return console.log(err);
        else console.log(`Сервак распарсил входящий файл и записал его в result${i}.json`);
      });
    });
  });
});

