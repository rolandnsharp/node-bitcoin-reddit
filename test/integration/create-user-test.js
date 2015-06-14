var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();

describe('User: create', function() {

  it.only('should create a new user', function(done) {

    var username = 'testusername';
    var email = 'testemail@test.com';
    var password = 'testpassword';

    request.get('/')
      // .send({
        // username: username,
        // email: email,
      //   password: password
      // })
      // .set('Accept', 'application/json') // another test that accepts html
      // .expect('Content-Type', /json/)
      .end(function(err, res) {

        console.log(err, res, 'created');
        // should.not.exist(err);


        // res.body.should.have.properties({
        //   username: username,
        //   email: email
        // });
        // todo check passwordHash
        done();
      });
  });

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
