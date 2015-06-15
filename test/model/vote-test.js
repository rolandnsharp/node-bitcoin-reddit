var Vote = require('../../models/vote.js');
var should = require('chai').should();


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
