var Vote = require('../../models/vote');
var Post = require('../../models/post');
var User = require('../../models/user');
var cole = require('../../db/co_log_err.js').cole;


module.exports = function(req, res, next) {
    cole(function* () {

    	// the post that is being upvoted
    	var postId = req.body.postId
		var post = (yield Post.findById(postId))[0];

		// the user that upvoted
		var userId = req.user.id
		var user = (yield User.findById(userId))[0];

		// the users that have previously upvoted
		var previousVotes = yield Vote.findByPostId(postId)
		var previousInvestorIds = previousVotes.map(vote => vote.userId)
		var investors = yield User.findByIds(previousInvestorIds)

		// decrease balance of voting user
		user.balance -= process.env.VOTE_COST
		yield User.update(user, 'id')

		// increase balance of investors
		for(var voteIndex = 0; voteIndex < previousVotes.length; voteIndex++) {
			for(var investorIndex = 0; investorIndex < investors.length; investorIndex++) {
				if(previousVotes[voteIndex].userId === investors[investorIndex].id) {

					investors[investorIndex].balance += Math.floor(process.env.VOTE_COST / previousVotes.length)
					yield User.update(investors[investorIndex], 'id') // this can be optimized if a user can vote multiple times
				
				}
			}
		}

		// increase investment in the post, add new investor, and save
		post.investment += parseInt(process.env.VOTE_COST)
		post.investors.push(user.username)
		yield Post.update(post, 'id')

		yield Vote.create({postId: postId, userId: userId, timestamp: new Date().getTime()})

		res.json({
			success: true,
			postId: postId,
			balance: user.balance,
			investment: post.investment,
			investors: post.investors
		});
		
	});
};
