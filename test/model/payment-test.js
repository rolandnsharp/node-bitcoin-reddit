var Payment = require('../../models/payment.js');
var should = require('chai').should();


describe('test payment', function() {

  it('insert', function(done) {
    var payment = {
      amount: 10000000,
      transaction_hash: 'lajdfakjbfkdajbsflkwbjel',
      username: 'John',
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
