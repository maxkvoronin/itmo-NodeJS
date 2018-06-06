/* 
 * Отдайте пользователю ошибку 404. 
 */

var http = require('http');

    http.createServer((request, response) => {
        console.log("HTTP works!");
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('<hl style="font-size: 5em;">Page Not Found!</hl>');
        response.end();
}). listen (8080);