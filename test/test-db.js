


describe('test insert user', function(){

	console.log('testing user insert')

	var user = {
		userName: 'John',
		balance: 1000
	};
	var callback = function(err, rows) {

		console.log('callback', err, rows)
		if(err) {
			console.log(err);
		} else {
			console.log('success', rows);
		} 
			done();
	}
	var userModel = require('../models/user.js')
	userModel.insert(user, callback)
/*
	it('should run a blank test', function(done){
		done();
	});
*/
});
