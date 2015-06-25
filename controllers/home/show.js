Post = require('../../models/post');
var cole = require('../../db/co_log_err.js').cole;

module.exports = function show(req, res, next) {
	cole(function* () {
		var posts = yield Post.findAll()
		res.render('index', {
			title: 'Express',
			user: req.user || null,
			posts: posts || null
		});
	});

};