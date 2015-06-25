var Post = require('../../models/post.js');
var should = require('chai').should();
var cole = require('../../db/co_log_err.js').cole;


describe('test post', function() {

  var post = {
    title: 'A Title',
    text: 'text text text text text text text text text text text text text text text text text text ',
    url: 'www.ab.com',
    timestamp: 1234,
    forum: 'main',
    username: 'John'
  };


  it('create', function(done) {

    cole(function* () {
      yield Post.create(post);
      done();
    })

  });


  it('findAll', function(done) {

    cole(function* () {
      var res = yield Post.findAll();
      res[0].text.should.eql(post.text);
      done();
    })

  });



  it('findById', function(done) {

    cole(function* () {
      var res = yield Post.findById(1);
      //res[0].text.should.eql(post.text);
      done();
    })

  });

});