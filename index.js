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
	console.log(usersConnected.length)

	socket.on('username', function(username){
		socket._events['username'] = username;
		//console.log("let's see if username is updated:", socket)												
	});

	socket.on('disconnect', function(username) {
		//console.log('user disconnected');
		//i = usersConnected.indexOf(socket)
		//console.log("the position of the user in the array was, ", i)
		//console.log(socket)
		console.log("test", socket)
		if(socket._events['username'] === ''){
			socket._events['username'] = "Mr. X";
			console.log(socket._events['username'])

		}
		socket.broadcast.emit('user left', socket._events['username']+' has left us');
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