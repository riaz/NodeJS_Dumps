//Requiring what we need
var http = require('http');

//Build the server
var app = http.createServer(function(request,response){
	response.writeHead(200,{ "Content-Type" : "text/plain"});

	response.end("HelloWorld!\n");
});

app.listen(2001,"localhost");
console.log("Server is running at http://localhost:2001");
