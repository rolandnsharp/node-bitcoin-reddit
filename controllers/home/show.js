Post = require('../../models/post');
Forum = require('../../models/forum');
var cole = require('../../db/co_log_err.js').cole;

module.exports = function show(req, res, next) {
	cole(function* () {
		var posts = yield Post.findAll()
		var forums = yield Forum.findAll()

		res.render('index', {
			title: 'Express',
			name: 'home',
			user: req.user || null,
			posts: posts || null,
			forums: forums
		});
	});

};