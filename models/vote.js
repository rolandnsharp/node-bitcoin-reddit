var db = require('../db');
var query = db.query;



exports.create = function (vote, callback) {
    // insert user
    var sql = 'INSERT INTO "votes" (user_id, post_id) VALUES ($1, $2);';
    var values = [vote.user_id, vote.post_id];

    query(sql, values, function(err, rows) {
        callback(err, rows)
    });

};
