const http = require('http');
const util = require('util');
const fs = require('fs');

let pages = {
  "ru": "pages/ru.html",
  "en": "pages/en.html"
}

let server = http.createServer((req, res) => {

  let readFile = util.promisify(fs.readFile);
  
  if (process.argv[2] === undefined) {
    console.warn('Languange undefined, set default language');
    process.argv[2] = "en";
  }

  async function getData() {
    return await readFile(pages[ process.argv[2] ]);
  }

  getData().then(data => {
     res.writeHead(200, {'Content-Type' : 'text/html' });
     res.end(data);
  })

}).listen(8080, err => {
  if (!err) console.log('Status: OK')
  else console.err(err)});