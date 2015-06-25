var express = require('express');
var router = express.Router();
var controller = require('../controllers');
var Post = require('../models/post');

/* GET home page. */
router.get('/', controller.home.show);

router.post('/signup', controller.user.create);


// submit a new post
router.get('/submit', function(req, res, next) {

    if (!req.user) {
        return res.redirect('/join');
    }

    res.render('submit', {
        title: 'submit',
        user: req.user
    });
});

router.get('/join', function(req, res, next) {
    res.render('join', {
        title: 'users',
        user: null
    });
});




router.post('/deposit', controller.payment.createDeposit);





module.exports = router;





