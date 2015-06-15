var Payment = require('../../models/payment');
var User = require('../../models/user');

module.exports = function(req, res, next) {

	User.findByAddress(req.body.payload.address, function(err, rows) {
		if(err) {
			returnErr(err)
		} else {
			Payment.createDeposit(req.body.payload, rows.username, function(err, rows) {
				if(err) {
					returnErr(err)
				} else {
					res.statusCode = 200
					res.setHeader('Content-Type', 'text/plain');
					res.send('OK\n')
				}
			})

			res.end()

		}

    })
}



function returnErr(err) {
	console.error('there was an error', err)
	res.statusCode = 500
	res.setHeader('Content-Type', 'text/plain');
	res.send('NOT OK\n')	
}
