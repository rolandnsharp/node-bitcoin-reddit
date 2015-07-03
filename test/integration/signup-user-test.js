var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;



describe('User: signup', function() {

  before(function(done){
    cole(function* () {

      var user = {
        username: 'existingUser',
        email: 'existingUser@test.com',
        passwordHash: 'testpassword',
        salt: 'salt',
        balance: 1000,
        key: 'some bitcoin key',
        address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
        joined: '1827369128'
      };
      yield User.remove({});
      yield User.create(user);
      done();
    })
  })



  it('should signup a new user', function(done) {

    var username = 'signupUser';
    var email = 'signupUser@test.com';
    var password = 'signupUserPassword';

    request.post('/signup')
      .send({
        username: username,
        email: email,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(201, function(err, res) {

        should.not.exist(err);
        res.body.should.have.property('success', true);
        res.body.should.have.property('message', 'Welcome signupUser');
//        res.body.should.have.property('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNpZ251cFVzZXIiLCJwYXNzd29yZEhhc2giOiJ1bzdoWjNadDk3TFc0QUJSWGZ6dXBJcGIwaGJHYVJVem9qOEJBaGx2eGVNPSIsInNhbHQiOiIxMjQzY2MyNWMxZDg2OTE5MzdiZWEyYTAiLCJlbWFpbCI6InNpZ251cFVzZXJAdGVzdC5jb20iLCJiYWxhbmNlIjowLCJrZXkiOiIwNTI3OTQzZjZjZDVhODE5NDg3OWE2NGFmYTZlODM5NTEwOGE0ODM2OTYyYzc0YWNhNzZjMTUyNWU5NTcxOGY2IiwiYWRkcmVzcyI6IjFISmVpcXllQ2ZhS2E1dUFmRzJSYUF3QW5BVEg3QmJKd1AiLCJqb2luZWQiOjE0MzUzMzA1MTg2NDQsImlhdCI6MTQzNTMzMDUxOCwiZXhwIjoxNDM1NDE2OTE4fQ.zObc-GTO4r-lw4YmzXeKBky_54AE1JG5foYHOM9OeRs');

        done();
      });
  });


  it('should bot create a new user bc username exists', function(done) {

    var username = 'existingUser';
    var email = 'existingUser123@test.com';
    var password = 'signupUserPassword';

    request.post('/signup')
      .send({
        username: username,
        email: email,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(500, function(err, res) {
        should.not.exist(err);
        //res.body.should.have.property('command', 'INSERT');
        //res.body.should.have.property('rowCount', 1);

        // todo check passwordHash
        done();
      });
  });


  it('should bot create a new user bc password exists', function(done) {

    var username = 'existingUser123';
    var email = 'existingUser@test.com';
    var password = 'signupUserPassword';

    request.post('/signup')
      .send({
        username: username,
        email: email,
        password: password
      })
      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', /json/)
      .expect(500, function(err, res) {
        should.not.exist(err);
        //res.body.should.have.property('command', 'INSERT');
        //res.body.should.have.property('rowCount', 1);

        // todo check passwordHash
        done();
      });
  });


  after(function(done){
    cole(function* () {
      yield User.remove({ username:'existingUser' });
      yield User.remove({ username:'signupUser' });
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
