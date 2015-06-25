var Payment = require('../../models/payment.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test payment', function() {

  it('insert', function(done) {
    var payment = {
      amount: 10000000,
      transactionHash: 'lajdfakjbfkdajbsflkwbjel',
      username: 'John',
      kind: 'deposit',
      timestamp: 1434124144
    };

    cole(function* () {
      yield Payment.create(payment);
      done();
    })

  });

});
