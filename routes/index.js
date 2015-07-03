var express = require('express');
var router = express.Router();
var controller = require('../controllers');
var Post = require('../models/post');

/* home page */
router.get('/', controller.home.show);


router.post('/signup', controller.user.signup);
router.post('/signin', controller.user.signin);
router.get('/logout', controller.user.logout);     // this should technically be a post
router.post('/deposit', controller.payment.createDeposit);



router.post('/submit', controller.post.create);




/* posts */
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









module.exports = router;





