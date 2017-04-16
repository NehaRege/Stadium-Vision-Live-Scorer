var http = require('http'), io = require('socket.io');

var server = http.createServer(function(req, res){ 

	res.writeHead(200,{'Content-Type':'text/html'}); 
	res.end('Hello');
});
server.listen(8080);

var socket = io.listen(server);

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var commentList = ["Good Shot !", "Missed to field !", "Classic Text Book Shot !", "Hat trick !", " Classical Sot !", "Unbelievable miss !", "Very good catch by mid-on player !"];
var scores = [4,6];
var score = 0;
var comment = "Good Shot";

socket.on('connection', function(client){ 
	console.log('Connected to server');


	var interval = setInterval(function() {

		score = score + scores[randomInt(0,1)];
		comment = commentList[randomInt(0,6)];

		client.send('<span style="color:#f95785; font-family: arial"> Current Score: '+score+ ' <p> Commentator: '+comment+ '</p></span>');
	},3300);
	
	client.on('message',function(event){ 
		console.log('Message received',event);
	});


	client.on('disconnect',function(){
		clearInterval(interval);
		console.log('Connection disconnected');
	});

});