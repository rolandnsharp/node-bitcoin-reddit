var Payment = require('../../models/payment');
var User = require('../../models/user');
var async = require('async')


// todo: verify that transaction exists on the blockchain
module.exports = function(req, res, next) {

	async.waterfall([
	    function(callback) {
    		User.findByAddress(req.body.payload.address, callback) 
	    },
	    function(rows, callback) {
	      	Payment.createDeposit(req.body.payload, rows[0].username, callback)
	    },
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

}







