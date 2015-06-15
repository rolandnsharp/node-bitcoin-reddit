var Comment = require('../../models/comment.js');
var should = require('chai').should();


describe('test comment', function() {

  it('insert', function(done) {
    var post = {
      text: 'text text text text text text text text text text text text text text text text text text ',
      forum: 'something',
      username: "Steve",
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