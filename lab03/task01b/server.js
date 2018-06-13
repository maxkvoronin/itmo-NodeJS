const http = require('http');
const util = require('util');
const fs = require('fs');

let pages = {
  "ru_RU.UTF-8": "pages/ru.html",
  "en_US.UTF-8": "pages/en.html"
}

let server = http.createServer((req, res) => {

  let readFile = util.promisify(fs.readFile);
  
  if (process.env.LANG === undefined) {
    console.warn('Languange undefined, set default language');
    process.env.LANG = "en_US.UTF-8";
  }

   async function getData() {
     return await readFile(pages[ process.env.LANG ]);
   }

   getData().then(data => {
      res.writeHead(200, {'Content-Type' : 'text/html' });
      res.end(data);
   })

}).listen(8080, err => {
  if (!err) console.log('Status: OK')
  else console.err(err)});