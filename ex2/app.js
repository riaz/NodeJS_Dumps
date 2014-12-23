var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function(req,res){
	res.sendfile(__dirname + '\\index.html');
});

io.sockets.on('connection',function(socket){
	socket.emit('news',{hello: 'world'});
	socket.on('oe', function(data){
		console.log(data);
	});
})
