// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');


exports.create = function (forum, client) {
    return db.insert(forum, 'forums', client)
};

exports.find = function (query, client) {
    return db.find('forums', query,  client)
};

exports.findAll = function (client) {
    return db.find('forums', {}, client)
};

exports.findById = function (id, client) {
    return db.find('forums', { id:id },  client)
};

