// http://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
var pg = require('pg');

var connectionString = process.env.POSTGRES_URI || "postgres://roland:postgres:5432@localhost/BitcoinReddit";
console.log(connectionString);


module.exports = {
	query: function(sql, values, callback) {
		pg.connect(connectionString, function(err, client, done) {
		  if(err) {
		    return console.error('error fetching client from pool', err);
		  }
		  client.query(sql, values, function(err, result) {
		    done();

		    if(err) {
		      return console.error('error running query', sql, JSON.stringify(values), err);
		    }

			callback(err, result);

		  });
		});
   }
};
