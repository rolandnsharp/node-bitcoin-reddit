// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var query = db.query;

/*
exports.findById = function findById(id, callback) {

    var text = 'SELECT * FROM "Users" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};

exports.removeById = function removeById(id, callback) {

    var text = 'DELETE FROM "Users" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};
*/


exports.findByName = function findByName(name, callback) {
    var text = 'SELECT * FROM "users"';
    var values = [];

    query(text, values, function(err, rows) {
        callback(err, rows ? rows[0] : null)
    });
};


exports.insert = function insert(user, callback) {
    var text = 'INSERT INTO "users" (userName, balance) VALUES ($1, $2);';
    var values = [user.userName, user.balance];

//    var text = 'INSERT INTO Users (userName, balance) VALUES ("'+user.userName+'", '+user.balance+')';
//    var values = [];
//    console.log('before query', text)

    query(text, values, function(err, rows) {
    console.log('after query', err, rows)
        callback(err, rows ? rows[0] : null)
    });
};



