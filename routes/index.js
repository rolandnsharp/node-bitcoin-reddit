var express = require('express');
var router = express.Router();
var controller = require('../controllers');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {

  // list index posts / front page posts
  Post.findAll(function(err, posts) {
      console.log(posts[0]);
      if (err) {
          return (next(err));
      }

      res.render('index', {
          title: 'Express',
          user: req.user || null,
          posts: posts || null
      });
  });

});

router.post('/join', controller.user.create);
router.post('/deposit', controller.payment.createDeposit);



module.exports = router;
