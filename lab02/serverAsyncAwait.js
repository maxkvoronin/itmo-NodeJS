const http = require('http');
const fs = require('fs');
const util = require('util');

const mimeTypes = {
    '.js' : 'text/javascript',
    '.html': 'text/html',
    '.css' : 'text/css' ,
    '.jpg' : 'image/jpeg',
    '.gif' : 'image/gif'
  };
  
http.createServer((request, response) => {
  
  let pathName = (request.url === '/') ? '/index.html' : request.url;
  let extName = pathName.match(/\.[^.]*$/g);
  let readFile = util.promisify(fs.readFile);

  pathName = 'site/' + pathName.slice(1);

  async function getData() {
    return await readFile(pathName);
  }

  getData().then(data => {
    response.writeHead(200, {'Content-Type' : mimeTypes[extName] });

    if(extName === '.gif' || extName === '.jpg')  
      response.end(data, 'binary');
    else
      response.end(data);
  })

}).listen(8080);