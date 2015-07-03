var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.engine('html', require('ejs').renderFile);



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {

// check header or url parameters or post parameters for token
//  var token = req.body.token || req.headers['x-access-token'] // || req.param('token');

  // look for token in a cookie
  var token = req.cookies.token

  // if we find a token we try and verify it
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'SuperSecret', function(err, user) {

      // if everything is good, save to request for use in other routes
      if (user)
        req.user = user;  
      
      // if token has been messed with we show a failiure message
      else
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      
      next();    
 
    });
  } else {

    next();    

  }
  
  
});





app.use('/', require('./routes/index'));
app.use('/u', require('./routes/user'));
app.use('/p', require('./routes/post'));






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.addListener('uncaughtException', function(err) {
    console.error('Uncaught error in server.js', {
        err: err,
        stack: err.stack
    });
    // TODO some sort of notification
    // process.exit(1);
});

module.exports = app;
