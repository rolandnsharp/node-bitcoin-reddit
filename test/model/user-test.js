var User = require('../../models/user.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test user', function() {


  var user = {
    username: 'testUser2',
    email: 'testemail@test.com',
    passwordHash: 'testpassword',
    salt: 'salt',
    balance: 1000,
    key: 'some bitcoin key',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  };



  it('create', function(done) {

    cole(function* () {
      yield User.create(user);
      done();
    })

  });


  it('findByAddress', function(done) {

    cole(function* () {
      var foundUser = yield User.findByAddress(user.address);
      done();
    })

  });


/*

  it('find', function(done) {

    User.findByName('testUser1', function(err, rows) {
      should.not.exist(err);

      rows[0].should.have.property('username', 'testUser1')
      rows[0].should.have.property('balance', '1000')
      rows[0].should.have.property('email', 'testemail@test.com')

      done();
    });

  });



  it('findByAddress', function(done) {

    User.findByAddress('15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE', function(err, rows) {
      should.not.exist(err);

      rows[0].should.have.property('username', 'testUser1')
      rows[0].should.have.property('balance', '1000')
      rows[0].should.have.property('email', 'testemail@test.com')

      done();
    });

  });

*/



});