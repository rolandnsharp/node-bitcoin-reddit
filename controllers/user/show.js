User = require('../../models/user');

module.exports = function show(req, res, next) {

    var userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if (err) {
            return next(err);
        }

        res.json(user);

    });


};
