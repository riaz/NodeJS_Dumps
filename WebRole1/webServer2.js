var app = require('express').createServer();

app.get('/',function(request,response){
	response.send('Hello Web Designer');
});

app.listen(8888);