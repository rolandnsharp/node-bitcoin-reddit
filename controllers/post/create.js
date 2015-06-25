var Post = require('../../models/post');

module.exports = function(req, res, next) {
    cole(function* () {

		var title = req.body.title;
		var url = req.body.url;
		var text = req.body.text;
		var username = req.user.username;

		var post = {
			title: title,
			username: username,
			url: url,
			text: text
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
