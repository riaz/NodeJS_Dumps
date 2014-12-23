var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js'   : 'text/javascript',
	'.html' : 'text/html',
	'.css'  : 'text/css'
};

var cache = {};

http.createServer(function(req,res){
	var lookup =  path.basename(decodeURI(req.url)) || 'index.html';
	var f = 'root/' + lookup;

	if(res.url == '/favicon.ico'){ // To handle non-existant favicon request by the http client
		res.writeHead(404,{'Content-Type' : 'text/plain'});
		res.end('Couldn\'t locate the required resource');
		return;
	}

	fs.exists(f, function(exists) {
		if(exists) {				
				var headers = { 'Content-type' : mimeTypes[path.extname(lookup)] };

				var s = fs.createReadStream(f).once('open',function(){
					res.writeHead(200,headers);					
					this.pipe(res);
					}).once('error',function(e){
						console.log(e);
						res.writeHead(500);
						res.end('Server Error');
					});

				fs.stat(f,function(err,stats){
					var bufferOffset = 0;
					cache[f] = {content : new Buffer(stats.size)};					
					s.on('data',function(chunk){
						chunk.copy(cache[f].content,bufferOffset);
						bufferOffset += chunk.length;
					});
				});	

				if(cache[f]) {
					res.writeHead(200,headers);
					res.end(cache[f].content);
					return;
				}				
			return;
		}	
		
		if(!res.finished){
			res.writeHead(404);
			res.end('Page Not Found!');			
		}
		
	});
}).listen(8080);
