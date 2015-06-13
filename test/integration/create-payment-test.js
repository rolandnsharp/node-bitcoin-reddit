var request = require('supertest')('../../app');
var should = require('should');

describe('Payment: create', function() {

	xit('should create a new user', function(done) {

		var username = 'testusername';
		var email = 'testemail@test.com';
		var password = 'testpassword';

		request.post('/join')
			.send({
				username: username,
				email: email,
				password: password
			})
			.set('Accept', 'application/json') // another test that accepts html
			.expect('Content-Type', /json/)
			.expect(201, function(err, res) {
				// should.not.exist(err);

				console.log(err, res.body, 'created');

				res.body.should.have.properties({
					username: username,
					email: email
				});
				// todo check passwordHash
				done();
			});
	});
});