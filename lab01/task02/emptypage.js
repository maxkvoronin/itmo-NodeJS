/* Добавим в скрипт возврат ответа  
 * Запустите сервер. Перешлите клиенту свою простую страницу
 */

var http = require('http');

    http.createServer((request, response) => {
        console.log("HTTP works!");
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('<hl style="font-size: 5em;">Hello!</hl>');
        response.end();
}). listen (8080);
