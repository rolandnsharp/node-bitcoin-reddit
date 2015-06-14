var db = require('../db');
var query = db.query;

exports.create = function (wallet, callback) {
    var sql = 'INSERT INTO "wallet" (key, address, balance, username) VALUES ($1, $2, $3, $4);';
    var values = [wallet.key, wallet.address, wallet.balance, wallet.username];
    query(sql, values, function(err, rows) {
        callback(err, rows)
    });
};

