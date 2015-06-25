var should = require('chai').should();
var db = require('../../db');
//var query = db.query;
var co = require('co')
var cole = require('../../db/co_log_err.js').cole;





describe('test index', function() {


  var post = {
    title: 'A New Title',
    text: 'text text text text text text text text text text text text text text text text text text ',
    url: 'www.ab.com',
    timestamp: 1234,
    forum: 'main',
    username: 'John'
  };





  it('test query with insert statement', function(done) {

    co(function* () {
      try{
	    var sql = 'INSERT INTO "posts" (title, text, url, timestamp, forum, username) VALUES ($1, $2, $3, $4, $5, $6);';
	    var values = [post.title, post.text, post.url, post.timestamp, post.forum, post.username];

        var conn = yield db.getConnection()
        var res = yield db.query(sql, values, conn.client)
        res.should.eql([]);

        conn.done()
	    done();

      } catch(err) {
        console.error(err)
      }
    }).catch(console.error)

  });


  it('test query with select statement', function(done) {

    co(function* () {
      try{

        var res = yield db.query('SELECT * FROM posts;', [])
        //console.log(res)
        res[0].title.should.eql(post.title);

	    done();
      } catch(err) {
        console.error(err)
      }
    }).catch(console.error)

  }); 


  it('test query with select statement, explicit client', function(done) {

    co(function* () {
      try{

        var conn = yield db.getConnection()
        var res = yield db.query('SELECT * FROM posts;', [], conn.client)
        res[0].title.should.eql(post.title);
        conn.done()
	    done();

      } catch(err) {
        console.error(err)
      }
    }).catch(console.error)

  }); 


  it('test insert', function(done) {

    co(function* () {
      try{

      	post.title = 'kajsbfdskl'

        var conn = yield db.getConnection()
        var res = yield db.insert(post, 'posts', conn.client)
	    res.should.eql([]);
        conn.done()
	    done();

      } catch(err) { console.error(err) }
    }).catch(console.error)

  });



  it('test co_log_err', function(done) {

    cole(function* () {
        var res = yield db.query('SELECT * FROM posts;', [])
        res[0].text.should.eql(post.text);
	    done();
    })

  }); 


  it('test co_log_err with explicit client', function(done) {

    cole(function* () {
        var conn = yield db.getConnection()
        var res = yield db.query('SELECT * FROM posts;', [], conn.client)
        res[0].text.should.eql(post.text);
        conn.done()
	    done();
    })

  }); 


});


















