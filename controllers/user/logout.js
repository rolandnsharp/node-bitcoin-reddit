module.exports = function (req, res, next) {
	res.clearCookie('token', {});

    res.format({
        'text/html': function() {
            res.redirect('/')
        },
        'application/json': function() {
            res.json({
                success: true,
                message: 'Bye',
            }); 
        }
    });

};
