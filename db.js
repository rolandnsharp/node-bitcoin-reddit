// http://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
var pg = require('pg');

var connectionString = "pg://something:1234@localhost/postgres";

module.exports = {
   query: function(text, values, callback) {
      pg.connect(connectionString, function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          callback(err, result);
        });
      });
   }
};
