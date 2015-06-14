var User = require('../../models/user');
var Wallet = require('../../models/wallet');

module.exports = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    // var verifyPassword = req.body.verifyPassword;
    var email = req.body.email;

    // if (password !== verifyPassword) {
    // verify password client side
    // }

    var user = {
        username: username,
        password: password,
        email: email
    };

    User.create(user, function(err, user) {
        if (err) {
            return next(err);
        }

        res.format({
            'text/html': function() {
                res.redirect('/' + user.username); // redirect to /show
            },
            'application/json': function() {
                res.status(201).json(user); // HTTP status 201 created
            }
        });
    });
};
