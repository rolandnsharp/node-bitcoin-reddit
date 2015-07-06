var Forum = require('../../models/forum');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

		var forum = {
			name: req.body.name,
			description: req.body.description,
			rules: req.body.rules,
			administrator: req.body.administrator,
			timestamp: new Date().getTime(),
		};

		yield Forum.create(forum)
		
		res.format({
			'text/html': function() {
				res.redirect('/');// redirect to /show
			},
			'application/json': function() {
				res.send(forum);
			}
		});		
	});
};
