// https://github.com/scotch-io/node-token-authentication/blob/master/server.js

var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

module.exports = function show(req, res, next) {
    cole(function* () {

        var username = req.body.username;
        var password = req.body.password;
        //var email = req.body.email;

	    var user = (yield User.findByName(username))[0]

		if (!user) {
		
			res.status(500).json({ 
				success: false, 
				message: 'Authentication failed. User password combination not found. (user not found)' 
			});
		
		} else if (user) {

	        var passwordHash = crypto.createHash('sha256').update(user.salt+':'+password).digest('base64');

			// check if password matches
			if (user.passwordHash != passwordHash) {
				res.status(500).json({ 
					success: false, 
					message: 'Authentication failed. User password combination not found. (pwd not found)' 
				});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, 'SuperSecret', {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				// return the information including token as JSON
				res.status(200).json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}   
		}
	});

};
