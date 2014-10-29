var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);


app.get('/', function(request, response){
		response.sendFile(__dirname + '/index.html');
	});

var storeUsername;

io.on('connection', function(socket){
	console.log('a user connected');
	socket.broadcast.emit('new user entered', 'a new user has entered the arena - play nice');

	socket.on('username', function(username){
		storeUsername = username;												
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
		socket.broadcast.emit('user left', storeUsername+' has left us');
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
	socket.broadcast.emit('chat message', msg, storeUsername);
	});
});



http.listen(9292, function(){
	console.log('listening on port:9292');
});