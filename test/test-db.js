var User = require('../models/user.js');
var should = require('should');

describe('test insert user', function() {

    it('something something', function(done) {
        console.log('testing user insert')

        var user = {
            userName: 'John',
            balance: 1000
        };

        User.insert(user, function(err, rows) {
            should.not.exist(err);

// rows.should.exactly.equal(something)
            done();
        });
    });
});
