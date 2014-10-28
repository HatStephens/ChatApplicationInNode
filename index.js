var app = require('express')();
var http = require('http').createServer(app);


app.get('/', function(request, response){
		response.send('<h1>Hello World</h1>');
	});

http.listen(9292, function(){
	console.log('listening on port:9292');
});