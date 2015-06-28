// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var bitcore = require('bitcore');
var async = require('async');
var query = db.query;



exports.create = function (user, callback) {
    var sql = 'INSERT INTO "users" (username, email, password_hash, salt, key, address, balance, joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
    var values = [user.username, user.email, user.passwordHash, user.salt, user.key, user.address, user.balance, user.joined];
    query(sql, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};

exports.findByAddress = function (address, callback) {
    var text = 'SELECT * FROM "users" WHERE address = $1;';
    var values = [address];

    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};


exports.findByUsername = function (name, callback) {
    var text = 'SELECT * FROM "users" WHERE username = $1;';
    var values = [name];

    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};
