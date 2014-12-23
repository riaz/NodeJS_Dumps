var io = require('socket.io').listen(8888);

io.sockets.on('connection',function(socket){
	socket.emit('news',{hello: 'world'});
	socket.on('other events',function(data){
		//This is how we write custom events
		console.log(data);
	});
});