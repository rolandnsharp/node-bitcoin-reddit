var Post = require('../../models/post.js');
var should = require('chai').should();



describe('test post', function() {

  it('insert', function(done) {
    var post = {
      title: 'A Title',
      text: 'text text text text text text text text text text text text text text text text text text ',
      url: 'www.ab.com',
      timestamp: 1234,
      forum: 'main',
      username: 'John'
    };

    Post.create(post, function(err, rows) {
      should.not.exist(err);
      //rows.should.exactly.equal(undefined)
      done();
    });
  });
});