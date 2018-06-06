/* 
 * Создадим скрипт в файл name.js Запустим через консоль командой
 * node name.js
 * Убедимся что при вызове сервера через браузер localhost:8080 в консоль выводится
 * "HTTP works!"
 */

var http = require('http'); // подключение модуля

var server = http.createServer((request, response) => {// вызов метода создания http сервера
    console.log("HTTP works!");
    console.log(request);
    console.log(response);
});

server.listen(8080);
