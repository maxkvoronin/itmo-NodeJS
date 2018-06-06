/**
 * Хороший асинхронный пример с использованием async
 */
var fs = require('fs'); 
var http = require('http');
var async = require('async');

var fileNames = [
    "lab01/task03.1/header.html", 
    "lab01/task03.1/body.html", 
    "lab01/task03.1/footer.html"
];

http.createServer(function (request, response) {
 
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    async.eachSeries(
        // Массив по которому будем итерировать
        fileNames,

        // Функция которая по каждому итератору будет проходить
        (_path, cb) => {
            fs.readFile(_path, 'utf8', (err, content) => {
                if (!err) 
                    response.write(content);
                else
                    console.log(`Could not find or open file "${_path}" for reading`);
                // Идем дальше
                cb(err);
            });
        },
          // Final callback after each item has been iterated over.
        (err) => {
            response.end()
        }
    );
}).listen (8080);
console.log('Server running on 8080');