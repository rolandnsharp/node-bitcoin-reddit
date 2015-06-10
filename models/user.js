// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var query = db.query;

exports.findById = function findById(id, callback) {

    var text = 'SELECT * FROM "user" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};

exports.removeById = function removeById(id, callback) {

    var text = 'DELETE FROM "user" USING "userId" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null)
    });
};
