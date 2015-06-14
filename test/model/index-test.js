var User = require('../../models/user.js');
var Post = require('../../models/post.js');
var Payment = require('../../models/payment.js');
var Wallet = require('../../models/wallet.js');
var Comment = require('../../models/comment.js');
var Vote = require('../../models/vote.js');

var should = require('chai').should();


describe('test user', function() {
  it('insert', function(done) {
    var user = {
      userName: 'testusername',
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

    var name = 'John';

    User.findByName(name, function(err, rows) {
      should.not.exist(err);
      //console.log(err, rows)
      //rows.should.exactly.equal(something)
      done();
    });
  });
});


describe('test post', function() {

  it('insert', function(done) {
    var post = {
      title: 'A Title',
      text: 'text text text text text text text text text text text text text text text text text text ',
      url: 'www.ab.com',
      timestamp: 1234,
      forum: 'main',
      username: 'John'
    };

    Post.create(post, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });
});

describe('test comment', function() {

  it('insert', function(done) {
    var post = {
      text: 'text text text text text text text text text text text text text text text text text text ',
      forum: 'something',
      userName: "Steve",
      parent: 123,
      timestamp: 1234
    };

    Comment.create(post, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });
});

describe('test vote', function() {

  it('insert', function(done) {
    var vote = {
      user_id: 123,
      post_id: 1234
    };

    Vote.create(vote, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });
});


describe('test payment', function() {

  it('insert', function(done) {
    var payment = {
      amount: 10000000,
      transaction_hash: 'lajdfakjbfkdajbsflkwbjel',
      userName: 'John',
      kind: 'deposit',
      timestamp: 1434124144
    };

    Payment.create(payment, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });

});


describe('test wallet', function() {

  it('insert', function(done) {
    var wallet = {
      key: 'ksdjfb',
      address: 'alkdfn',
      balance: 12341234,
      userName: 'Joe'
    };

    Wallet.create(wallet, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });

});
