var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js'   : 'text/javascript',
	'.html' : 'text/html',
	'.css'  : 'text/css'
};

var on = true;

var cache = {};
function cacheAndDeliver(f,cb) { 
	fs.stat(f,function(err,stats){
		var lastChanged = Date.parse(stats.mtime),
		    isUpdated =  (cache[f]) && lastChanged > cache[f].timestamp;	
	if(!cache[f] || isUpdated){
		fs.readFile(f, function(err,data){
			if(!err) {
				var duration = 0;

				if(on)
				{
					prev = Date.now();
					on = false;
				}

				cache[f] = {
								content: data,
								timestamp: Date.now()
							};

				duration = (cache[f].timestamp - prev)/1000;
				prev = 	cache[f].timestamp;

				console.log('loading ' + f + ' from file system');
				console.log('Last Cached ' + duration + ' seconds ago');
				}
				cb(err,data);			
		});
		return;	
	}
	console.log('loading' + f + ' from cache');
	cb(null,cache[f].content);
});
}

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
			cacheAndDeliver(f,function(err,data){ // This is directly accessing storage on each Client Request
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
