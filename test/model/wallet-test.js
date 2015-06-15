var Wallet = require('../../models/wallet.js');
var should = require('chai').should();


describe('test wallet', function() {

  it('insert', function(done) {
    var wallet = {
      key: 'ksdjfb',
      address: 'alkdfn',
      balance: 12341234,
      username: 'Joe'
    };

    Wallet.create(wallet, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });

});
