var Payment = require('../../models/payment');

module.exports = function(req, res, next) {

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

	Payment.create(post, function(err, post) {
		console.log(err, post);
		if (err) {
			return next(err);
		}

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