var Payment = require('../../models/payment');

module.exports = function(req, res, next) {

	Payment.createDeposit(req.body.payload, 'John', function(err, rows) {
		if(err) {
			console.log('there was an error', err)
			res.statusCode = 500
    		res.setHeader('Content-Type', 'text/plain');
			res.send('NOT OK\n')
		} else {
			res.statusCode = 200
    		res.setHeader('Content-Type', 'text/plain');
			res.send('OK\n')
		}
		res.end()
    })

}


