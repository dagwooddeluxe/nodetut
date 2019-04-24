var express = require('express');
var socket = require('socket.io');
var http = require('http');
var hostname = 'localhost';
var port = 37372;


//App setup
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

server.listen(port, hostname, function (err) {
  if (err) {
    throw err;
  }
  console.log('server listening on: ', hostname, ':', port);
});

// Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection', socket.id);
    
    
    socket.on('chat', function(data){
        io.sockets.emit('chat',data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);      
    });
});