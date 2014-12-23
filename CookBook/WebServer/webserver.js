var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js'   : 'text/javascript',
	'.html' : 'text/html',
	'.css'  : 'text/css'
};

http.createServer(function(req,res){
	var lookup =  path.basename(decodeURI(req.url)) || 'index.html';
	var f = 'root/' + lookup;

	if(res.url == '/favicon.ico'){ // To handle non-existant favicon request by the http client
		res.writeHead(404,{'Content-Type' : 'text/plain'});
		res.end('Couldn\'t locate the required resource');
		return;
	}

	fs.exists(f, function(exists) {
		if(exists)
		{
			fs.readFile(f,function(err,data){ // This is directly accessing storage on each Client Request
				if(err) {
					res.writeHead(500);
					res.end('Server Error!');
					return;
				}			
				
				var headers = { 'Content-type' : mimeTypes[path.extname(lookup)] };
				res.writeHead(200,headers);
				res.end(data);											
			});	

			return;
		}	
		
		if(!res.finished){
			res.writeHead(404);
			res.end('Page Not Found!');			
		}
		
	});
}).listen(8080);
