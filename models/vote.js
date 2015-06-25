var db = require('../db');
var query = db.query;



exports.create = function (vote, client) {
    return db.insert(vote, 'votes', client)
};
