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


/* never use with user provided data (does not use prepared statement)*/
exports.findWhereIn = function(table, att, list, client) {
/*
	var string = '('
	for(var i = 0; i < list.length; i++)
		string += '?,'
    string = (string.slice(0, - 1))+')'
	return this.query("SELECT * FROM "+table+" WHERE "+att+" IN "+string+";", list, client)	
*/
	// if the list of values is empty, we return the empty set
	if(list.length == 0)
		return new Promise(function(resolve, reject) { resolve([]); })
	else
		return this.query("SELECT * FROM "+table+" WHERE "+att+" IN ("+list.toString()+");", [], client)	
}


exports.remove = function(table, query, client) {
	var where = queryToWhere(query)	
	return this.query("DELETE FROM "+table+" WHERE "+where.clause+";", where.values, client)	
}


exports.insert = function(table, obj, client) {

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

   	return this.query("INSERT INTO "+table+" "+collumns+" VALUES "+values+" RETURNING id;", params, client)
}



exports.update = function(table, obj, dbKey, client) {
    var set = " SET ",
        params = [],
        i = 1

    for (var key in obj)
      if (obj.hasOwnProperty(key) && key != 'id') {
        set += '"'+key+'"=$'+(i++)+','
        params.push(obj[key])
      }
    set = (set.slice(0, - 1))

    var where = " WHERE "+dbKey+"=$"+(i++)
    params.push(obj[dbKey])
   	return this.query("UPDATE "+table+set+where, params, client)
}



/* ---- helpers ---- */

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
















