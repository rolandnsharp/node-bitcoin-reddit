var Wallet = require('../../models/wallet.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test wallet', function() {



    var wallet = {
      key: 'ksdjfb',
      address: 'alkdfn',
      balance: 12341234,
      username: 'Joe'
    };

  it('create', function(done) {

    cole(function* () {
      yield Wallet.create(wallet);
      done();
    })

  });

});
