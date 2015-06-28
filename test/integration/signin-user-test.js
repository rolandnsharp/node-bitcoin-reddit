var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;
var crypto = require('crypto');



describe('User: signin', function() {


  before(function(done){
    cole(function* () {

    	var password = 'testpassword'
    	var salt = 'salt'
		var user = {
			username: 'existingUser',
			email: 'existingUser@test.com',
			passwordHash: crypto.createHash('sha256').update(salt+':'+password).digest('base64'),
			salt: salt,
			balance: 1000,
			key: 'some bitcoin key',
			address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
			joined: '1827369128'
		};

		yield User.create(user);
		done();
    })
  })


  it('should signin a user', function(done) {

    var username = 'existingUser';
    var password = 'testpassword';

    request.post('/u/signin')
      .send({
        username: username,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(200, function(err, res) {
        should.not.exist(err);
        res.body.should.have.property('success', true);

        done();
      });
  });


  it('should return user not found', function(done) {

    var username = 'existingUser1';
    var password = 'testpassword';

    request.post('/u/signin')
      .send({
        username: username,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(500, function(err, res) {
        should.not.exist(err);
        //res.body.should.have.property('success', true);

        done();
      });
  });


  it('should return user not found', function(done) {

    var username = 'existingUser';
    var password = 'testpassword1';

    request.post('/u/signin')
      .send({
        username: username,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(500, function(err, res) {
        should.not.exist(err);
        //res.body.should.have.property('success', true);

        done();
      });
  });




  after(function(done){
    cole(function* () {
      yield User.remove({ username:'existingUser' });
      //yield User.remove({ username:'signupUser' });
      done();
    })
  })


  //
  // xit('should render a new user in HTML', function(done) {
  //
  //   var username = 'testusername';
  //   var email = 'testemail@test.com';
  //   var password = 'testpassword';
  //
  //   request.post('/users')
  //     .send({
  //       username: username,
  //       email: email,
  //       password: password
  //     })
  //     .set('Accept', 'text/html')
  //     .expect('Content-Type', /html/)
  //     .expect(200, function(err, res) {
  //       // should.not.exist(err);
  //
  //       console.log(res, 'created');
  //
  //       done();
  //     });
  // });
});
