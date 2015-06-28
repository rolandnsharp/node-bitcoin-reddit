var User = require('../../models/user');
var logger = require('../../helpers/logger');

module.exports = function show(req, res, next) {

  var username = req.params.username;

  console.log(username, 'username to show');

  User.findByUsername(username, function(err, user) {
    if (err) {
      logger.error('User :: Show :: error finding user by username', {
        err: err,
        stack: err.stack
      });
      return next(err);
    }

    if (!user) {
      logger.error('User :: findByUsername :: not found', {
        err: err,
        stack: err.stack
      });
      return res.status(404).json({
        error: {
          code: 404,
          message: 'replace this not found error with a strongly typed one'
        }
      });
    }

    res.json(user);
  });
};
