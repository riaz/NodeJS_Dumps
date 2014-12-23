var express = require('express'); 
var http = require('http');
var qs = require('querystring');

var tableName="";
var oldtable="";
var CLIENTS=[];
var flag = "";
var poll;
var timer;
var json;

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8888});

wss.on('connection', function(ws) {
		CLIENTS.push(ws);		
   		ws.on('message', function(data) {
    	tableName = data;		 
        console.log('Requested Table Name:', tableName);
    	});
    	ws.send(flag);
});  

function authorize(username, password) {  
    return 'SAP' === username & 'password' === password;  
}    

var app = express();
var auth = express.basicAuth(authorize);  
  
app.configure(function () {  
    app.use(express.bodyParser());  
});

app.post('/publish', auth, function (request, response) {  
        
      
        json = JSON.stringify(request.body);
		if(json){
			// tableName= "";
			flag = "ok";			
			for(var i=0;i<CLIENTS.length;i++){
    			CLIENTS[i].send(flag);
    			
    			}		
		}		

		if(tableName == ""){
			console.log(tableName);
			response.send(tableName);					
		}
		// }else{
		// 	console.log("user entered a value");
		// 	timer = 2000;
		// 	while(tableName == oldtable){
		// 		timer = 2000;
		// 	setTimeout(function() {								
					
		// 	}, timer);	
		// 	timer+=2000;
		// 	}			
		// 	console.log(tableName);
		// 	response.send(tableName);			
		// 	oldtable = tableName;
		// }	

});  
app.listen(7000); // Express /publish listening on 7000   
console.log('Server Running...');  

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
		
}).listen(8080);	




