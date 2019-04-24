//Make Connection
var socket = io.connect('http://localhost:37372');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

function howdy(){
    alert("howdy");
}


// Emit Events

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value, handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing',handle.value);
});

//Listen for Events

socket.on('chat', function(data){
    feedback.innerHTML = "";
    
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'; 
});