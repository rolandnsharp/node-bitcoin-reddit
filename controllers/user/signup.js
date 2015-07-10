var User = require('../../models/user');
var Wallet = require('../../models/wallet');
var Chain = require('chain-node');
var chain = new Chain('c217818c8c0b31e012775aa8b5ebb318'); // todo: move to dot env
var bitcore = require('bitcore');
var crypto = require('crypto');
var cole = require('../../db/co_log_err.js').cole;
var jwt    = require('jsonwebtoken');



module.exports = function(req, res, next) {
    cole(function* () {

        console.log('signup', req.body)

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;

        var userByEmail = (yield User.find({ email:email }))[0]
        var userByUsername = (yield User.find({ username:username }))[0]

        if(userByEmail) {
            res.status(200).json({
                success: false,
                message: 'Email taken'
            });
        } else if(userByUsername) {
            res.status(200).json({
                success: false,
                message: 'Username taken'
            });            
        } else {

            // generate new key address pair for that user
            var key = new bitcore.PrivateKey();
            var address = key.toAddress();

            // todo: register address with chain (see code below)

            // hash & salt password
            var salt = (crypto.randomBytes(12)).toString('hex');
            var passwordHash = crypto.createHash('sha256').update(salt+':'+password).digest('base64');

            // create user
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

            // create new user tuple and store the id in object 
            var idObj = yield User.create(user)
            user.id = idObj[0].id 

            // create a token
            var token = jwt.sign(user, 'SuperSecret', {
                expiresInMinutes: 1440 // expires in 24 hours
            });

            // store token in a cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(201)
            res.json({
                success: true,
                //token: token
            });

/*
            res.format({
                'text/html': function() {
                    res.redirect('/')
                },
                'application/json': function() {
                    res.json({
                        success: true,
                        message: 'Welcome '+user.username,
                        token: token
                    }); 
                }
            });
*/
        }

    })
};



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
