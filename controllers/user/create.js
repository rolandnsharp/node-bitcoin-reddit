var User = require('../../models/user');
var Wallet = require('../../models/wallet');
var Chain = require('chain-node');
var chain = new Chain(process.env.CHAIN_API);
var bitcore = require('bitcore');
var crypto = require('crypto')


module.exports = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    // var verifyPassword = req.body.verifyPassword;
    var email = req.body.email;

    // if (password !== verifyPassword) {
    // verify password client side
    // }

    // todo: usual checks for registering


    // generate new key address pair for that user
    var key = new bitcore.PrivateKey();
    var address = key.toAddress();
/*
    // make sure we get a post request to /deposit when there is a transaction to that address
    chain.createNotification({
        type: "address",
        block_chain: "bitcoin",
        address: address.toString(),
        url: "https://bitcoinreddit.com/deposit"},
        function(err, resp) {
            if(err) fsLogger.logError(err)
            else callback(err, resp)
        }
    )
*/


    var salt = (crypto.randomBytes(12)).toString('hex');
    var passwordHash = crypto.createHash('sha256').update(salt+':'+password).digest('base64');

    var user = {
        username: username,
        passwordHash: passwordHash,
        salt: salt,
        email: email,
        balance: 0,
        key: key.toString(),
        address: address.toString(),
        joined: new Date().getTime()
    };

    User.create(user, function(err, user) {
        if (err) {
            return next(err);
        }


        res.format({
            'text/html': function() {
                res.redirect('/user/' + username); // redirect to /show
            },
            'application/json': function() {
                res.status(201).json(user); // HTTP status 201 created
            }
        });
    });
};
