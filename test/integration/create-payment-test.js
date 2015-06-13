var request = require('supertest')('../../app');
var should = require('should');

describe('Payment: create', function() {

	it('should create a new payment', function(done) {


		request.post('/deposit')
//			.field('name', 'my awesome avatar')
/*			
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
*/
	});
});