var express = require('express'); 
var http = require('http');
var qs = require('querystring');

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
		response.send(jsonp);
});  
  
app.post('/publish', auth, function (request, response) {  
		json = JSON.stringify(request.body);
    	//io.sockets.emit("SAP_Event", request.body);     
		if(jsonp == {})
		{
			next();
			console.log("control sent to next");
		}
});    

		    http.createServer(function(req,res){
			
			var headers = { 'Content-type' : 'application/json' ,
							'Access-Control-Allow-Origin' : '*',
						    'Access-Control-Allow-Headers' : 'X-Requested-With,GET,Content-Type'};								
			res.writeHead(200,headers);
			res.end(json);		
		
			if(req.method === "POST") {
		    var data = "";

		    req.on("data", function(chunk) {
		        data += chunk;
		    });

		    req.on("end", function() {
		        jsonp = qs.parse(data);
		        console.log("inside end");
		        console.log(jsonp);		   		
		    });
		}
						
		}).listen(8080); 

app.post('/publish', auth, function (request, response) {  
		response.send(jsonp);
}); 	 
  
app.listen(7000); // Express /publish listening on 7000 
  
console.log('Server Running...');  