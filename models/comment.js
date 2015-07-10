var db = require('../db');
var query = db.query;



exports.create = function (comment, client) {
    return db.insert('comments', comment, client)
};



