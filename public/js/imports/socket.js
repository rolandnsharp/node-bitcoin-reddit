//var io = require('socket.io-client');
//var socket = io.connect('http://localhost:3000');



/*
// without jwt
socket.on('connect', function () {
	socket.on('hi', function() {
		console.log('hey')
	})
});
*/

/*
// with jwt (not working yet)
socket.on('connect', function () {
	console.log('connected')
	socket.on('authenticated', function () {
		console.log('authenticated')
	})
    .emit('authenticate', {token: jwt}); //send the jwt
});
*/