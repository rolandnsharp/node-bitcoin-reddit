var User = require('../models/user.js');
var should = require('should');

describe('test user', function() {

/*
    it('insert', function(done) {

        var user = {
            userName: 'John',
            balance: 1000
        };

		User.insert(user, function(err, rows) {
			should.not.exist(err);
			//rows.should.exactly.equal(something)
			done();
		});
    });
*/


    it('find', function(done) {

        var name = 'John';

		User.findByName(name, function(err, rows) {
			should.not.exist(err);
			console.log(err, rows)
			//rows.should.exactly.equal(something)
			done();
		});
    });

});

