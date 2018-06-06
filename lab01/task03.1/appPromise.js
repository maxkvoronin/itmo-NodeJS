/**
 * Через промисы
 */

var fs = require('fs'); // . подключение модуля работы с файл
var http = require('http');

var fileNames = [
    "lab01/task03.1/header.html", 
    "lab01/task03.1/body.html", 
    "lab01/task03.1/footer.html"
];

http.createServer(function (request, response) {

    var promises= fileNames.map(function(_path){
        return new Promise(function(_path, resolve, reject){
            fs.readFile(_path, 'utf8', function(err, data){
                if(err){
                    console.log(`Could not find or open file "${_path}" for reading`);
                    resolve("");    
                }else{
                    resolve(data);
                }
            });
        }.bind(this, _path));
    });

    Promise.all(promises).then(function(results){
        //Put your callback logic here
        response.writeHead(200, {"Content-Type": "text/html"});
        results.forEach(function(content){response.write(content)});
        response.end();
    });
}).listen (8080);

console.log('Server running on 8080');