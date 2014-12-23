var express = require('express');
var io = require('socket.io').listen(1337);  //create socket.io server on port 1337

function authorize(username,password)
{
	return 'SAP'=== username & 'password' === password;
}

var app = express();
var auth = express.basicAuth(authorize);

app.configure(function(){
	app.use(express.bodyParser());	
});

app.get('/publish',auth,function(request,response){
	response.send("Server Running"); //Ping to SM59 Test	
});

app.post('/publish',auth,function(request,response){
	io.sockets.emit("SAP_Event",request.body);
	console.log("SAP Message: " +JSON.stringify(request.body));
	response.send(200);
});

io.sockets.on('connection',function(client){
	console.log("Client connected.........");
});

app.listen(7000); //Express /publish listening on 7000

console.log('Server Listening........');

