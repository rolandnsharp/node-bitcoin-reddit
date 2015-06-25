var Comment = require('../../models/comment.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test comment', function() {

  it('insert', function(done) {

    var comment = {
      text: 'text text text text text text text text text text text text text text text text text text ',
      forum: 'something',
      username: "Steve",
      parent: 123,
      timestamp: 1234
    };

    cole(function* () {
      yield Comment.create(comment)
      done();
    })

  });


});