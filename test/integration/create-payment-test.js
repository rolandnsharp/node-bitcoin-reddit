var app = require('../../app.js');

var request = require('supertest')(app);
//var request = require('supertest')('../../bin/www');
var should = require('should');







describe('Payment: create', function() {

	it('should create a new payment', function(done) {
	request
		.post('/users')

	done()


	});
});

