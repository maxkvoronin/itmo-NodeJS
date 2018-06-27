var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var table = {
  status: '',
  current: '',
  row1: ['','',''],
  row2: ['','',''],
  row3: ['','',''],
};

var players = [];

let isWin = function (tab) {
  if ((tab.row1[0] === 'X' && tab.row1[1] === 'X' && tab.row1[2] === 'X') ||
      (tab.row2[0] === 'X' && tab.row2[1] === 'X' && tab.row2[2] === 'X') ||
      (tab.row3[0] === 'X' && tab.row3[1] === 'X' && tab.row3[2] === 'X') ||
      (tab.row1[0] === 'X' && tab.row2[0] === 'X' && tab.row3[0] === 'X') ||
      (tab.row1[1] === 'X' && tab.row2[1] === 'X' && tab.row3[1] === 'X') ||
      (tab.row1[2] === 'X' && tab.row2[2] === 'X' && tab.row3[2] === 'X') ||
      (tab.row1[0] === 'X' && tab.row2[1] === 'X' && tab.row3[2] === 'X') ||
      (tab.row3[0] === 'X' && tab.row2[1] === 'X' && tab.row1[2] === 'X') ||

      (tab.row1[0] === 'O' && tab.row1[1] === 'O' && tab.row1[2] === 'O') ||
      (tab.row2[0] === 'O' && tab.row2[1] === 'O' && tab.row2[2] === 'O') ||
      (tab.row3[0] === 'O' && tab.row3[1] === 'O' && tab.row3[2] === 'O') ||
      (tab.row1[0] === 'O' && tab.row2[0] === 'O' && tab.row3[0] === 'O') ||
      (tab.row1[1] === 'O' && tab.row2[1] === 'O' && tab.row3[1] === 'O') ||
      (tab.row1[2] === 'O' && tab.row2[2] === 'O' && tab.row3[2] === 'O') ||
      (tab.row1[0] === 'O' && tab.row2[1] === 'O' && tab.row3[2] === 'O') ||
      (tab.row3[0] === 'O' && tab.row2[1] === 'O' && tab.row1[2] === 'O')) {
    return true;
      }
}

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
      players[1].emit('status', table);
      players[0] = players[1];
    });

    players[1].on('disconnect', () => {
      table.status = 'disconnect 2';
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