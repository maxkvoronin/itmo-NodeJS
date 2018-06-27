const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const isWin = require('./model/tictac.js');

server.listen(3000);
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function (socket) {
  let connectedPlayers = Object.keys(io.sockets.connected).length;
  console.log("connectedPlayers: " + connectedPlayers);

  if (connectedPlayers === 1) {
    players[0] = socket;

    table.status = 'wait 2';
    socket.emit('status', table);
  }

  else if (connectedPlayers === 2) {
    players[1] = socket;

    players[0].on('disconnect', () => {
      table.status = 'disconnect 1';
      console.log("player 1 disconnected");
      players[1].emit('status', table);
      players[0] = players[1];
    });

    players[1].on('disconnect', () => {
      table.status = 'disconnect 2';
      console.log("player 2 disconnected");
      players[0].emit('status', table);
    });

    table.status = 'wait 1';
    socket.emit('status', table);

    table.current = 'X';

    players[0].emit('your turn', table);
    
    players[0].on('my turn', (table) => {
      table.status = 'wait turn player 2';
      console.log(table);

      if(isWin(table)) {
        console.log('player 1 win');
        table.status = 'win';
        players[0].emit('status', table);

        table.status = 'loose';
        players[1].emit('status', table);
      }
      else
        players[1].emit('your turn', table);
    });
    
    players[1].on('my turn', (table) => {
      table.status = 'wait turn player 1';
      console.log(table);

      if(isWin(table)) {
        console.log('player 2 win'); 
        table.status = 'win';
        players[1].emit('status', table);

        table.status = 'loose';
        players[0].emit('status', table);
      }
      else
        players[0].emit('your turn', table);
    });

  }
  else {
    table.status = 'none';
    socket.emit('status', table);
  }
    
});