var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/deposit', function(req, res, next) {
	console.log('deposit router')
  res.send('respond with a resource');
});

module.exports = router;
