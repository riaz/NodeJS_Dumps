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
	// fs.exists(file, function(exists) {
	// 	if(exists)
	// 	{
				json = JSON.stringify(request.body);
				// fs.writeFile(file, JSON.stringify(request.body), function(err) {
				// if(err) {
				//     console.log(err);
				// }
				// else {
				//         console.log("File Written Successfully!");
				//     }
				// }); 	

			// 	return;													
			// }				
	// });  
    io.sockets.emit("SAP_Event", request.body);          
    //console.log("SAP Message" + JSON.stringify(request.body));
    //response.send(200);  
    response.send(jsonp);
});  

http.createServer(function(req,res){
	var f = 'index.html';

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
				
				var headers = { 'Content-type' : 'application/json' ,
								'Access-Control-Allow-Origin' : '*',
							    'Access-Control-Allow-Headers' : 'X-Requested-With,GET,Content-Type'};								
				res.writeHead(200,headers);
				res.end(json);											
			});	

			return;
		}	
		
		if(!res.finished){
			res.writeHead(404);
			res.end('Page Not Found!');			
		}
		
	});

//***********************************
	if(req.method === "POST") {
    var data = "";

    req.on("data", function(chunk) {
        data += chunk;
    });

    req.on("end", function() {
       // util.log("raw: " + data);

        jsonp = qs.parse(data);
        console.log(jsonp);

        app.post('/publish', auth, function (request, response) {  

        	response.send(jsonp);
        })


        //util.log("jsonp: " + json);
    });
}
//***********************************		


}).listen(8080);
  
  
io.sockets.on('connection', function (client) {  
    console.log('Client connected...');  
});  
  
app.listen(7000); // Express /publish listening on 7000 
  
console.log('Server Running...');  