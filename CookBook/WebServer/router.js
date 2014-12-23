var http = require('http');
var path = require('path');

var pages = [
				{route: '' , output: 'You are currently in the Home Page'},
				{route: 'about', output: 'A simple routing Example using NodeJS'},
				{route: 'contact', output: 'riaz.2012@gmail.com'},
				{route: 'location', output: function() { return 'Hyderabad'; }},
			];
http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url));
	pages.forEach(function(page){
		if(page.route === lookup){
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(typeof page.output === 'function'? page.output():page.output);
		}
	});
	if(!res.finished){
			res.writeHead(404);
			res.end('Page Not Found!');
		}
	
}).listen(8080);

