var http = require('http');

var port = process.env.port || 8888;

function httpRequest(request,response){
		response.writeHead(200,{'Content-Type' : 'text/plain'});
		response.write('Hello Web Designer \n');
		response.end();

}

http.createServer(httpRequest).listen(port);
