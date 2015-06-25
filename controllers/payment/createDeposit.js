var Payment = require('../../models/payment');
var User = require('../../models/user');
//var async = require('async')
var cole = require('../../db/co_log_err.js').cole;


// todo: 
// * check nr of confirmations and store payment tuple only once
// * notify user at confirmation = 1
// * verify that transaction exists on the blockchain
module.exports = function(req, res, next) {

/*
	async.waterfall([
		// find the users that owns the address where a tx was registered
	    function(callback) {
    		User.findByAddress(req.body.payload.address, callback) 
	    },
	    // create payment tuple in db
	    function(rows, callback) {
	      	Payment.createDeposit(req.body.payload, rows[0].username, callback)
	    },
	    // send confirmations
	    function(rows, callback) {
			res.setHeader('Content-Type', 'text/plain')
			res.status(200)
			res.send("OK\n");
	    }
	], function (err, result) {
		res.setHeader('Content-Type', 'text/plain')
		res.status(500)
		res.send("NOT OK\n");
	});
*/

	cole(function* () {

		var user = (yield User.findByAddress(req.body.payload.address))[0]

		//console.log(user, req.body.payload)

	    yield Payment.createDeposit(req.body.payload, user.username)


		res.setHeader('Content-Type', 'text/plain')
		res.status(200)
		res.send("OK\n");

	})

}







