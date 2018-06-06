/**
 * Плохой синхронный пример с использовагнием readFileSync
 */

var fs = require('fs'); // . подключение модуля работы с файл
var http = require('http');

var fileNames = [
    "lab01/task03.1/header.html", 
    "lab01/task03.1/body.html", 
    "lab01/task03.1/footer.html"
];

http.createServer(function (req, res) {
    var data = '';   
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    fileNames.forEach( function (_path) {   
        data+=fs.readFileSync(_path, 'utf8');
    });

    res.end(data);
}).listen (8080);
console.log('Server running on 8080');