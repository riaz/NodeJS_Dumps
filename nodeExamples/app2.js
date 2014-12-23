//Requiring what we need
var http = require('http');

//Build the server
var app = http.createServer(function(request,response){

	var answer = "";

	answer += "Request URL: " + request.url + "\n";
	answer += "Request Type:" + request.method + "\n";
	answer += "Request Headers:" + JSON.stringify(request.headers);

	console.log(answer);

	response.writeHead(200,{ "Content-Type" : "text/plain"});

	response.end(answer);
});

app.listen(2001,"localhost");
console.log("Server is running at http://localhost:2001");
