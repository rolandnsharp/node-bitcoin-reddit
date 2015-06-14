var db = require('../db');
var query = db.query;

exports.create = function (payment, callback) {
    var sql = 'INSERT INTO "payment" (amount, transaction_hash, username, kind, timestamp) VALUES ($1, $2, $3, $4, $5);';
    var values = [payment.amount, payment.transaction_hash, payment.userName, payment.kind, payment.timestamp];
    query(sql, values, function(err, rows) {
        callback(err, rows)
    });
};

