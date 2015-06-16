var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();
var db = require('../../db');
var query = db.query;


describe('Payment: create', function() {


  before(function(done){

    var sql = 'INSERT INTO "users" (username, email, password, key, address, balance) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [
      'createPaymentUser', 
      'testemail@test.com', 
      'testpassword', 
      '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50', 
      'adfbeEyfEET9GqTSF4JpFRHAD8YGpYLbCE', 
      '1000'];

    query(sql, values, done);
  })


  it('should create a new payment', function(done) {

    var notification = {
        "id": "2837-38f0-j292-29f3",
        "created_at": "2014-10-20T18:27:16Z",
        "delivery_attempt": 1,
        "notification_id": "38220-243858-3848303838",
        "payload": {
          "type": "address",
          "address": "adfbeEyfEET9GqTSF4JpFRHAD8YGpYLbCE",
          "block_chain": "bitcoin",
          "sent": 0,
          "received": 4000,
          "input_addresses": ["1rBauUT..."],
          "output_addresses": ["1kf93kf..."],
          "transaction_hash": "48d4425...",
          "block_hash": "00000000000004758...",
          "confirmations": 5
        }
      }

    request
      .post('/deposit')
      .send(notification)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, function(err, res) {

        if (err) throw err;

        should.not.exist(err);
        (res.text).should.eql('OK\n');

        done();

      });

  });



  after(function(done){
    var sql = 'DELETE FROM "users" WHERE username=$1;';
    var values = ['createPaymentUser'];
    query(sql, values, done);
  })


});
