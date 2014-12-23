var express = require('express'); //requiring express
var app = express(); // creating a new node application instance using express

//This application node instance can be used to start defining routes

app.get('/hello.txt', function(req,res){
	//var body = 'HelloWorld';
	//res.setHeader('Content-Type', 'text/plain');
	//res.setHeaderr('Content-Length', body.length);
	//res.end(body);
	//or	
	res.send('HelloWorld');
});

app.get('/',function(req,res){
	res.send('This is the home page');
});

app.listen(80);
console.log('Listening on port 80');