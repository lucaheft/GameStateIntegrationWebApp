var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var app = require('express')();
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/data', function(req, res){
	res.sendStatus(200);
	io.emit('update', req.body);
	console.log('Sent update request to clients.......');
	//console.log('%j', req.body);
});

io.on('connection', function(socket){
	console.log('Connection established!');
});

http.listen(3000, function(){
	console.log('Listening on localhost:3000');
});