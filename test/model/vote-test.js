var Vote = require('../../models/vote.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test vote', function() {


  var vote = {
    userId: 123,
    postId: 1234
  };


  it('create', function(done) {

    cole(function* () {
      yield Vote.create(vote);
      done();
    })

  });

});
