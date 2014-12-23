var io = require('socket.io').listen(1111);

io.sockets.on('connection',function(socket){
	socket.emit('handshake',{status:'successful'});
	socket.on('entry',function(data){
		// send this data to SAP for retrieving the table data
	});
})


