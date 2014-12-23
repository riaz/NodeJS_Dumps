//Requiring what we need
var connect = require('connect');
var http = require('http');

//Build the server
var app = connect();

app.use(function(request,response){

	if(request.url == "/")
	{
		response.writeHead(200,{ "Content-Type" : "text/plain"});
		response.end("Welcome to the Homepage\n");
	}

	else if(request.url == "/about")
	{
		response.writeHead(200,{ "Content-Type" : "text/plain"});
		response.end("About Page\n");
	}
	else if(request.url == "/contact")
	{
		response.writeHead(200,{ "Content-Type" : "text/plain"});
		response.end("Contacts Page\n");
	}
	else if(request.url == "/blog")
	{
		response.writeHead(200,{ "Content-Type" : "text/plain"});
		response.end("Blog Roll\n");
	}
	else
	{
		response.writeHead(404,{ "Content-Type" : "text/plain"});
		response.end("Error:Page Not Found\n");	
	}
});

http.createServer(app).listen(2001,"localhost");
console.log("Server is running at http://localhost:2001");
