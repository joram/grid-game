var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = require('./players');
players.setSocket(io)

var dungeon = require('./dungeon');

app.use(express.static('static'));

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/templates/chat.html');
});


app.get('/grid', function(req, res){
  res.sendFile(__dirname + '/templates/grid.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('box details', function(v){
    dungeon.updateBoxDetails(v, socket)
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

