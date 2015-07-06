var Post = require('../../models/post');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

		var title = req.body.title;
		var url = req.body.url;
		var text = req.body.text;
		var username = req.user.username;

		var post = {
			title: title,
			text: text,
			url: url,
			timestamp: new Date().getTime(),
			forum: 'TODO',
			investment: 0,
			username: username,
		};

		yield Post.create(post)
		
		res.format({
			'text/html': function() {
				res.redirect('/');// redirect to /show
			},
			'application/json': function() {
				res.send(post);
			}
		});
		
	});
};
