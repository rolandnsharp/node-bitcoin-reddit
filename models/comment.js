var db = require('../db');
var query = db.query;



exports.create = function (comment, client) {
    return db.insert(comment, 'comments', client)
};



