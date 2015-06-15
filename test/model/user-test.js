var User = require('../../models/user.js');
var should = require('chai').should();


describe('test user', function() {



  it('create', function(done) {
    var user = {
      username: 'testuser',
      email: 'testemail@test.com',
      password: 'testpassword',
      balance: 1000
    };
    User.create(user, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(something)
      done();
    });
  });




  it('find', function(done) {

    User.findByName('testuser', function(err, rows) {
      should.not.exist(err);

      rows[0].should.have.property('balance', '1000')
      rows[0].should.have.property('email', 'testemail@test.com')

      done();
    });

  });



  it('findByAddress', function(done) {

    User.findByAddress('15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE', function(err, rows) {
      should.not.exist(err);

      done();
    });

  });






});