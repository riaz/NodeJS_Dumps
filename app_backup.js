var express = require('express'); 
var http = require('http');
var qs = require('querystring');

var tableName="";
var json;

function authorize(username, password) {  
    return 'SAP' === username & 'password' === password;  
}    

var app = express();
var auth = express.basicAuth(authorize);  


var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8888});
wss.on('connection', function(ws) {
    ws.on('message', function(data) {
    	tableName = data; 
        console.log('Requested Table Name: %s', tableName);
    });
    ws.send('something');
});
  
app.configure(function () {  
    app.use(express.bodyParser());  
});

app.get('/publish', auth, function (request, response) {  			
		response.send(tableName);
}); 

app.post('/publish', auth, function (request, response) {  
	
		json = JSON.stringify(request.body);

		if(tableName != "")
			response.send(tableName);


 		var server = http.createServer(function(req,res){
	

		if(res.url == '/favicon.ico'){ // To handle non-existant favicon request by the http client
			res.writeHead(404,{'Content-Type' : 'text/plain'});
			res.end('Couldn\'t locate the required resource');
			return;
		}
				
		var headers = { 'Content-type' : 'application/json' ,
						'Access-Control-Allow-Origin' : '*',
					    'Access-Control-Allow-Headers' : 'X-Requested-With,GET,Content-Type'};								
		res.writeHead(200,headers);
		res.end(json);											
		
        if(!res.finished){
			res.writeHead(404);
			res.end('Page Not Found!');			
		}
		
	});

 	server.listen(8080);			
});  

app.listen(7000); // Express /publish listening on 7000   
console.log('Server Running...');  


