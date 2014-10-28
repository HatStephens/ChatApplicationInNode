var app = require('express')();
var http = require('http').createServer(app);


app.get('/', function(request, response){
		response.sendFile(__dirname + '/index.html');
	});

http.listen(9292, function(){
	console.log('listening on port:9292');
});