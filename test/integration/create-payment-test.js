var app = require('../../app');
var request = require('supertest')(app);
var should = require('chai').should();

describe('Payment: create', function() {

  it('should create a new payment', function(done) {

    var notification = {
        "id": "2837-38f0-j292-29f3",
        "created_at": "2014-10-20T18:27:16Z",
        "delivery_attempt": 1,
        "notification_id": "38220-243858-3848303838",
        "payload": {
          "type": "address",
          "address": "1kf93kf...",
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
//      .set('Accept', 'application/json') // another test that accepts html
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, function(err, res) {
//        console.log(err, res)
        should.not.exist(err);


/*
        res.body.should.have.properties({
          username: username,
          email: email
        });
*/
        // todo check passwordHash
        done();
      });

  });
});
