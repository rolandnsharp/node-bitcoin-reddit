// http://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
var pg = require('pg');
var connectionString = "postgres://clemensley:postgres:5432@localhost/BitcoinReddit";



module.exports = {
	query: function(text, values, callback) {
		pg.connect(connectionString, function(err, client, done) {
		  if(err) {
		    return console.error('error fetching client from pool', err);
		  }
		  client.query(text, values, function(err, result) {
		    done();
		    
		    if(err) {
		      return console.error('error running query', err);
		    }

			callback(err, result);

		  });
		});
   }
};


