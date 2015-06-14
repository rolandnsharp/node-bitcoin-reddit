// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var query = db.query;

exports.findAll = function (callback) {

    var text = 'SELECT * FROM "posts"';
    var values = null;

    query(text, values, function(err, rows) {
      callback(err, rows);
    });
};

exports.findById = function (id, callback) {

    var text = 'SELECT * FROM "posts" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, rows) {
      callback(err, rows ? rows[0] : null);
    });
};


exports.create = function (post, callback) {
    var text = 'INSERT INTO "posts" (title, text, url, timestamp, forum, username) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [post.title, post.text, post.url, post.timestamp, post.forum, post.username];

    query(text, values, function(err, rows) {
        callback(err, rows ? rows[0] : null);
    });
};


exports.findAll = function (post, callback) {
    var text = 'SELECT * FROM "posts" ORDER BY timestamp DESC';
    var values = [];

    query(text, values, function(err, rows) {
        callback(err, rows ? rows[0] : null);
    });
};
