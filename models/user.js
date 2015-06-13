// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var bitcore = require('bitcore');
var query = db.query;



exports.create = function (user, callback) {

    // we might have to move part of this into the controller

    // generate key address pair
    var key = new bitcore.PrivateKey();
    var address = key.toAddress();

    // insert user
    var sql = 'INSERT INTO "users" (userName, email, password, key, address, balance) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [user.userName, user.email, user.password, key.toString(), address.toString(), user.balance];
    query(sql, values, function(err, rows) {
        callback(err, rows)
    });

    // insert address
    var sql = 'INSERT INTO "address" (key, address, balance) VALUES ($1, $2, $3);';
    var values = [key.toString(), address.toString(), 0];
    query(sql, values, function(err, rows) {
        //callback(err, rows)
    });

};


exports.findByName = function (name, callback) {
    var text = 'SELECT * FROM "users" WHERE userName = $1;';
    var values = [name];

    query(text, values, function(err, rows) {
        callback(err, rows ? rows.rows : null)
    });
};

