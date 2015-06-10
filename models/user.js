var db = require('../db');

exports.findOne = function findOne(conditions, callback) {

    var text = 'select user from table where id ($userId)';
    var values = [$userId];

    db.query(text, values, function(err, user) {
        callback(err, user);
    });
};
