var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var perlin = require('./perlin');

app.use(express.static('static'));

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/templates/chat.html');
});


app.get('/grid', function(req, res){
  res.sendFile(__dirname + '/templates/grid.html');
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('box details', function(details){
    r = g = b = Math.floor(perlin.get_perlin_value(details['x'], details['y']))
//    details['color'] = getRandomColor()
    details['color'] = rgbToHex(r, g, b)
    socket.emit("box details", details)
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});