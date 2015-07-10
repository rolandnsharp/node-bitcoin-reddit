// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');





exports.create = function (user, client) {
    return db.insert('users', user, client)
};

exports.find = function (query, client) {
    return db.find('users', query,  client)
};

exports.findAll = function (client) {
    return db.find('users', {}, client)
};

exports.findById = function (id, client) {
    return db.find('users', { id:id },  client)
};

exports.findByIds = function (ids, client) {
    return db.findWhereIn('users', 'id', ids,  client)
};

exports.findByAddress = function (address, client) {
    return db.find('users', { address:address },  client)
};

exports.findByName = function (username, client) {
    return db.find('users', { username:username },  client)
};

exports.findByEmail = function (username, client) {
    return db.find('users', { username:username },  client)
};

exports.remove = function (query, client) {
    return db.remove('users', query, client)
};

exports.update = function (user, dbKey, client) {
    return db.update('users', user, dbKey, client)
};



