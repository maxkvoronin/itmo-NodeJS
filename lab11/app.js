const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';
const ObjectID = require('mongodb').ObjectID;

server.listen(8080);
app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('newElement', (msg) => { 
    mongoClient.connect(url, {useNewUrlParser: true }, function(err, dbs) {
      if(err) return console.log(err);

      dbs.db('test').collection("tasks").insertOne(msg, function(err, result){
          if(err) return console.log(err);
        });
   
      dbs.db('test').collection("tasks").find().toArray(function(err, results){
        io.sockets.emit('done', results);
      });
    });
  });
  
  socket.on('getAllElements', () => {
    mongoClient.connect(url, {useNewUrlParser: true }, function(err, dbs) {
      if(err) return console.log(err);

      dbs.db('test').collection("tasks").find().toArray(function(err, results){
        io.sockets.emit('done', results);
      });
    }); 
  });

  socket.on('deleteElements', (elems) => {
    mongoClient.connect(url, {useNewUrlParser: true }, function(err, dbs) {
      if(err) return console.log(err);
    
      var usersDelete = [];

      elems.forEach((elem) => {  
        usersDelete.push(new ObjectID(elem));
      });

      dbs.db('test').collection("tasks").deleteMany({_id: {$in:usersDelete}}, function(err, result){
        if(err) return console.log(err);
      });

      dbs.db('test').collection("tasks").find().toArray(function(err, results){
        if(err) return console.log(err);
        io.sockets.emit('done', results);
      });
    });    
  });
});

