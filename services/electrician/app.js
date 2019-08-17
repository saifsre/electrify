var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/electrician', { useNewUrlParser: true })
.then(() => {console.log('Mongo db is connected!')})
.catch((err)=> {console.log(err)});


var electricianRouter = require('./routes/electrician'); 

var app = express();

 // parse application/json
 app.use(bodyParser.json());                        

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));

app.use('/electrician', electricianRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
