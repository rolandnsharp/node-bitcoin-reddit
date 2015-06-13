var db = require('../db');
var query = db.query;



exports.create = function (comment, callback) {
    // insert user
    var sql = 'INSERT INTO "comments" (text, forum, username, parent, timestamp) VALUES ($1, $2, $3, $4, $5);';
    var values = [comment.text, comment.forum, comment.userName, comment.parent, comment.timestamp];

    query(sql, values, function(err, rows) {
        callback(err, rows)
    });

};



