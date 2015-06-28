// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var bitcore = require('bitcore');
var async = require('async');
var query = db.query;
var User = require('../models/user.js');

exports.create = function(user, callback) {
  var sql = 'INSERT INTO "users" (username, email, password_hash, salt, key, address, balance, joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  var values = [user.username, user.email, user.passwordHash, user.salt, user.key, user.address, user.balance, user.joined];
  query(sql, values, function(err, res) {
    callback(err, res ? res.rows : null)
  });
};

exports.findByAddress = function(address, callback) {
  var text = 'SELECT * FROM "users" WHERE address = $1;';
  var values = [address];

  query(text, values, function(err, res) {
    callback(err, res ? res.rows : null)
  });
};

exports.findByUsername = function(name, callback) {
  var text = 'SELECT * FROM "users" WHERE username = $1;';
  var values = [name];

  query(text, values, function(err, res) {
    callback(err, res ? res.rows : null)
  });
};

exports.authenticate = function(username, password, callback) {
    User.findByUsername(username, function(err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false, {
          message: 'Incorrect username.'
        });
      }
      // TODO create validPassword method
      if (!user.validPassword(password)) {
        return callback(null, false, {
          message: 'Incorrect password.'
        });
      }
      return callback(null, user);
    });
  }
};

exports.serialize = function(user, callback) {
    // only store the username in session
    callback(null, user.username);
};

exports.deserialize = function(username, callback) {
  User.findByUsername(username, function(err, user) {
    callback(err, user);
  });
};
