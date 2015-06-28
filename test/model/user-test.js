var User = require('../../models/user.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test user', function() {


  var user = {
    username: 'usertestuser',
    email: 'usertestuser@test.com',
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

  after(function(done){
    cole(function* () {
      yield User.remove({ username: user.username });
      done();
    })
  })



});