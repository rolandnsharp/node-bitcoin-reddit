// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');


exports.create = function (post, client) {
    return db.insert(post, 'posts', client)
};

exports.find = function (query, client) {
    return db.find('posts', query,  client)
};

exports.findAll = function (client) {
    return db.find('posts', {}, client)
};

exports.findById = function (id, client) {
    return db.find('posts', { id:id },  client)
};

