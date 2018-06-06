/*
 * Отдадим станицу через чтение файла
 */

var fs = require('fs'); // . подключение модуля работы с файл
var fileName = "lab01/task03/index.html";
var http = require('http');

http.createServer(function (req, res) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) {
            console.log('Could not find or open file for reading\n' );
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
}).listen (8080);

console.log('Server running on 8080');