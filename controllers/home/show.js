var Post = require('../../models/post');
var Forum = require('../../models/forum');
var cole = require('../../db/co_log_err.js').cole;

var investorList = function(list) {
	return JSON.stringify(list)
}

module.exports = function show(req, res, next) {
	cole(function* () {
		var posts = yield Post.findAll()
		var forums = yield Forum.findAll()

		res.render('layout', {
			title: 'Express',
			main: 'imports/feeds/homeFeed',
			sidebar: 'imports/sidebars/homeSidebar',
			name: 'home',
			user: req.user || null,
			posts: posts || null,
			forums: forums,
			investorList: investorList
		});
	});

};

