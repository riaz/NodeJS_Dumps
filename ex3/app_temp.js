var express = require('express'); 
var http = require('http');
var fs = require('fs'); 

var util = require('util');
var qs = require('querystring');

var io = require("socket.io").listen(1337); // create socket.io server on port 1337  
//var file = 'C:/xampp/htdocs/ExtJS/data.json';

var json;
var jsonp = [];

function authorize(username, password) {  
    return 'SAP' === username & 'password' === password;  
}    

var app = express();
var auth = express.basicAuth(authorize);  
  
app.configure(function () {  
    app.use(express.bodyParser());  
});  
  
app.get('/publish', auth, function (request, response) {  	
		//console.log(request.url);
    	//response.send("Server running"); //Ping for SM59 Test      
    	response.send(jsonp);
});  
  
app.post('/publish', auth, function (request, response) {  
		json = JSON.stringify(request.body);
    	//io.sockets.emit("SAP_Event", request.body);     

	    http.createServer(function(req,res){
		//var f = 'index.html';

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
	//***********************************
		if(req.method === "POST") {
	    var data = "";

	    req.on("data", function(chunk) {
	        data += chunk;
	    });

	    req.on("end", function() {

	        jsonp = qs.parse(data);
	        console.log("inside end");
	        console.log(jsonp);
	   		response.send(jsonp);
	    });
	}
	//***********************************				
	}).listen(8080,function(){
		console.log("Entering the callback function");
		console.log(jsonp);
		//response.send(jsonp);
	});	
	//response.send(jsonp);
});    
  
// io.sockets.on('connection', function (client) {  
//     console.log('Client connected...');  
// });  
  
app.listen(7000); // Express /publish listening on 7000 
  
console.log('Server Running...');  