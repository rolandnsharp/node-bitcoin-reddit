// http://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
var pg = require('pg');

var connectionString = process.env.POSTGRES_URI || "postgres://clemensley:postgres:5432@localhost/BitcoinReddit";
console.log(connectionString);


exports.getConnection = function () {
	return new Promise(function(resolve, reject) {
		pg.connect(connectionString, function(err, client, done) {
			if (err) {
				reject(err);
				console.error('error fetching client from pool'+err);
			} else {
				resolve({ client:client, done:done });
			}		
		});
	});
}


// this is the only interface to the db
exports.query = function (sql, values, client)  {

	//console.log(sql)

	// if a client is passed we use that to query
	// don't forget to dispost of the client by calling conn.done()
	if(client) {
		return new Promise(function(resolve, reject) {
			client.query(sql, values, function(err, result) {
				if (err) {
					reject(err);
					console.error('error running query '+err);
				} else {
					resolve(result.rows);
				}
			});
		});

	// otherwise we fetch a new client 
	// and return it to the pool immidiately
	} else {
		return new Promise(function(resolve, reject) {
			pg.connect(connectionString, function(err, client, done) {
				if (err) {
					console.error('error fetching client from pool '+err);
					reject(err);
				} else {
					client.query(sql, values, function(err, result) {
						done();
						if (err) {
							console.error('error running query '+err);
							reject(err);
						} else {
							resolve(result.rows);
						}
					});
				}		
			});
		});
	}
}



exports.find = function(table, query, client) {
	var where = queryToWhere(query)	
	return this.query("SELECT * FROM "+table+" WHERE "+where.clause+";", where.values, client)	
}


exports.remove = function(table, query, client) {
	var where = queryToWhere(query)	
	return this.query("DELETE FROM "+table+" WHERE "+where.clause+";", where.values, client)	
}


exports.insert = function(obj, table, client) {

    var collumns = '('
	var values = '('
    var params = []
    var i = 1

    for (var key in obj)
      if (obj.hasOwnProperty(key) && key != 'id') {
      	collumns += '"'+key+'",'
      	values += '$'+(i++)+','
        params.push(obj[key])
      }
    collumns = (collumns.slice(0, - 1))+')'
    values = (values.slice(0, - 1))+')'

   	return this.query("INSERT INTO "+table+" "+collumns+" VALUES "+values+";", params, client)
}



function queryToWhere(query) {
	// if the query is empty
	if(Object.keys(query).length === 0) {
		return { clause:'true', values:[] }
	} else {
		var where = ''
		var values = []
		var i = 1
		for (var key in query)
		  if (query.hasOwnProperty(key)) {
		  	where += '"'+key+'"=$'+(i++)+' AND '
		    values.push(query[key])
		  }
		return { clause:where.slice(0, - 5), values:values }				
	}
}


/*
function update(obj, table, dbKey, client) {
    var set = "SET ",
        params = []

    for (var key in obj)
      if (obj.hasOwnProperty(key) && key != 'id') {
        set += key+"=?,"
        params.push(obj[key])
      }
    set = (set.slice(0, - 1))

    var where = " WHERE "+dbKey+"=?"
    params.push(obj[dbKey])
   	return this.query("UPDATE "+table+set+where, params, client)
}
*/






