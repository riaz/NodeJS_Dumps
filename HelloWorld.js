var http = require('http');

http.createServer(
	function(request,response)
	{
		response.writeHead(200);
		response.write('HelloWorld!');
		response.end();
	
	}).listen(8080);

console.log("Server is running on port 8080, stay tuned!!");

