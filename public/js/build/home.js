(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./imports/socket.js')
},{"./imports/socket.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
