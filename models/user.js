// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var bitcore = require('bitcore');
var async = require('async');
var query = db.query;

// User constructor

var User = function(user) {

  for (var key in user) {
    this[key] = user[key];
  }
};

// User Statics

User.create = function(user, callback) {
  var sql = 'INSERT INTO "users" (username, email, password_hash, salt, key, address, balance, joined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  var values = [user.username, user.email, user.passwordHash, user.salt, user.key, user.address, user.balance, user.joined];
  query(sql, values, function(err, res) {
    callback(err, res ? res.rows : null)
  });
};

User.findByAddress = function(address, callback) {
  var text = 'SELECT * FROM "users" WHERE address = $1;';
  var values = [address];

  query(text, values, function(err, res) {
    callback(err, res ? res.rows : null)
  });
};

User.findByUsername = function(name, callback) {
  var text = 'SELECT * FROM "users" WHERE username = $1;';
  var values = [name];

  query(text, values, function(err, res) {

    var user = res ? res.rows[0] : null;

    // Then instantiate a new user object with inherited methods:
    user = new User(user);

    callback(err, user);
  });
};

User.authenticate = function() {
  var self = this;

  return function(username, password, callback) {
    self.findByUsername(username, function(err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false, {
          message: 'Incorrect username.'
        });
      }
      // TODO create validPassword method
      // if (!user.validPassword(password)) {
      //   return callback(null, false, {
      //     message: 'Incorrect password.'
      //   });
      // }

      return callback(null, user);
    });
  }
};

User.serialize = function() {
  return function(user, callback) {
    // only store the username in session
    callback(null, user.username);
  }
};

User.deserialize = function() {
  var self = this;
  return function(username, callback) {
    self.findByUsername(username, function(err, user) {
      callback(err, user);
    });
  }
};

// User Methods

User.prototype.validPassword = function(password, callback) {
  this; // is bound to the `User` instance object it’s called from
  console.log(this, 'validPassword this!!!');
  callback(null, password);

};

module.exports = User;
