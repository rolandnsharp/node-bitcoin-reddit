var Post = require('../../models/post');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

		var post = {
			postKey: (Math.random().toString(36)+'00000000000000000').slice(2, 12), // random 10 char string
			title: req.body.title,
			text: req.body.text,
			url: req.body.url,
			timestamp: new Date().getTime(),
			forum: 'TODO',
			investors: [req.user.username],
			investment: 0,
			username: req.user.username,
		};

		yield Post.create(post)

		res.json({
			success: true,
		});
		
	});
};
