var db = require('../db');
var query = db.query;



exports.create = function (vote, client) {
    return db.insert('votes', vote, client)
};


exports.find = function (query, client) {
    return db.find('votes', query,  client)
};

exports.findAll = function (client) {
    return db.find('votes', {}, client)
};

exports.findById = function (id, client) {
    return db.find('votes', { id:id },  client)
};

exports.findByPostId = function (postId, client) {
    return db.find('votes', { postId:postId },  client)
};

