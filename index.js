var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);


app.get('/', function(request, response){
		response.sendFile(__dirname + '/index.html');
	});

var storeUsername;
var usersConnected = []

io.on('connection', function(socket){
	console.log('a user connected');
	socket.broadcast.emit('new user entered', 'a new user has entered the arena - play nice');
	usersConnected.push(socket)
	console.log('User connected. Users connected: ', usersConnected.length)

	socket.on('username', function(username){
		socket._events['username'] = username;
		console.log("let's see if username is updated: ", socket._events['username'])												
	});

	socket.on('disconnect', function(username) {
		if(typeof(socket._events['username']) === 'function'){
			socket._events['username'] = "Unknown User";
			console.log(socket._events['username'])
		}
		socket.broadcast.emit('user left', socket._events['username']+' has left us');
		usersConnected.splice(usersConnected.indexOf(socket), 1)
		console.log('User disconnected. Users connected: ', usersConnected.length);
	});
});

io.on('connection', function(socket){
	socket.on('user typing', function(username){
		socket.broadcast.emit('user typing', username+' is typing...');
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg, username){
	socket.broadcast.emit('chat message', msg, username);
	});
});



http.listen(9292, function(){
	console.log('listening on port:9292');
});