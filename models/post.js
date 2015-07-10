// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');


exports.create = function (post, client) {
    return db.insert('posts', post, client)
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

exports.update = function (post, dbKey, client) {
    return db.update('posts', post, dbKey, client)
};

