var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);


app.get('/', function(request, response){
		response.sendFile(__dirname + '/index.html');
	});

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('new user entered', 'a new user has entered the arena - play nice');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
	io.emit('chat message', msg);													// removed console.log('message: ' + msg);
	});
});



http.listen(9292, function(){
	console.log('listening on port:9292');
});