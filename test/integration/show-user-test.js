var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();

describe('User: create', function() {

  xit('should create a new user', function(done) {

    var username = 'testusername';
    request.get('/user/' + username)
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        should.not.exist(err);
        
        console.log(err, res.body);
        
        // todo check passwordHash
        done();
      });
  });

});
