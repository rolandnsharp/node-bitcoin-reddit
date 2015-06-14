var express = require('express');
var router = express.Router();
var controller = require('../controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', controller.user.show);

module.exports = router;
