// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var bitcore = require('bitcore');
var query = db.query;

/*
exports.findById = function (id, callback) {

    var text = 'SELECT * FROM "Users" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};

exports.removeById = function (id, callback) {

    var text = 'DELETE FROM "Users" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};
*/

exports.create = function (user, callback) {

  var key = new bitcore.PrivateKey(),
      address = key.toAddress()

    var text = 'INSERT INTO "users" (userName, email, password, key, address, balance) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [user.userName, user.email, user.password, key.toString(), address.toString(), user.balance];

    query(text, values, function(err, rows) {
        callback(err, rows)
    });
};


exports.findByName = function (name, callback) {
    var text = 'SELECT * FROM "users" WHERE userName = $1;';
    var values = [name];

    query(text, values, function(err, rows) {
        callback(err, rows ? rows.rows : null)
    });
};


exports.insert = function (user, callback) {
    var text = 'INSERT INTO "users" (userName, balance) VALUES ($1, $2);';
    var values = [user.userName, user.balance];

    query(text, values, function(err, rows) {
        callback(err, rows)
    });
};
