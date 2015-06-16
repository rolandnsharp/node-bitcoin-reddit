var User = require('../../models/user.js');
var should = require('chai').should();
var db = require('../../db');
var query = db.query;

describe('test user', function() {

  beforeEach(function(done){

    var sql = 'INSERT INTO "users" (username, email, password, key, address, balance) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [
      'testUser1', 
      'testemail@test.com', 
      'testpassword', 
      '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50', 
      '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE', 
      '1000'];

    query(sql, values, done);

  })


  it('create', function(done) {
    var user = {
      username: 'testUser2',
      email: 'testemail@test.com',
      password: 'testpassword',
      balance: 1000
    };
    User.create(user, function(err, rows) {
      should.not.exist(err);
      rows.should.eql([]);
      done();
    });
  });




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


  afterEach(function(done){
    var sql = 'DELETE FROM "users" WHERE username=$1 OR username=$2;';
    var values = ['testUser1', 'testUser2'];
    query(sql, values, done);
  })



});