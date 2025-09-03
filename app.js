const createError = require('http-errors');
const path = require('path');
const bodyParser= require('body-parser')
const express = require('express');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const router = require('./routes/router');

const BASE_PATH = process.env.BASE_PATH;

const passport = require('passport');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use((req, res, next) => {
  res.locals.basePath = BASE_PATH || '';
  next();
});

app.use(BASE_PATH ? `${BASE_PATH}/javascripts` : "/javascripts", express.static(__dirname + '/public/javascripts'));
app.use(BASE_PATH ? `${BASE_PATH}/images` : "/images", express.static(__dirname + '/public/images'));
app.use(BASE_PATH ? `${BASE_PATH}/files` : "/files", express.static(__dirname + '/public/files'));

app.use(logger('dev'));
app.use(session({secret: "asdasd"}));
app.use(express.static('public')); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());

// Use express-fileupload
app.use(fileUpload());

app.use(BASE_PATH || "/", router);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;