const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	socket.on('message_to_server', (msg) => { 
  	io.sockets.emit('message_to_clients', {msg: msg, name: `user-${socket.id.toString().substr(1,4)}`});
	});
});