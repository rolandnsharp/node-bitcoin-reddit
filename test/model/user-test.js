var User = require('../../models/user.js');
var should = require('chai').should();
var db = require('../../db');
var query = db.query;

describe('test user', function() {

  beforeEach(function(done){

    var sql = 'INSERT INTO "users" (username, email, password_hash, salt, key, address, balance, joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
    var values = [
      'testUser1',
      'testemail@test.com',
      'testpassword',
      'salt',
      '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
      '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
      '1000',
      '123345'];

    query(sql, values, done);

  })


  it('create', function(done) {
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
    User.create(user, function(err, rows) {
      should.not.exist(err);
      rows.should.eql([]);
      done();
    });
  });




  it('find', function(done) {

    User.findByUsername('testUser1', function(err, rows) {
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
