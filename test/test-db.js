var User = require('../models/user.js');
var Post = require('../models/post.js');
var should = require('should');

describe('test user', function() {


    it('insert', function(done) {

        var user = {
            userName: 'Peter',
            balance: 1000
        };

		User.insert(user, function(err, rows) {
			should.not.exist(err);
			//rows.should.exactly.equal(something)
			done();
		});
    });



    it('find', function(done) {

        var name = 'John';

		User.findByName(name, function(err, rows) {
			should.not.exist(err);
			//console.log(err, rows)
			//rows.should.exactly.equal(something)
			done();
		});
    });

});





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

		Post.insert(post, function(err, rows) {
			should.not.exist(err);
			//rows.should.exactly.equal(undefined)
			done();
		});
    });


});









