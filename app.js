var createError = require('http-errors');
var path = require('path');
var bodyParser= require('body-parser')
var studentsRouter = require('./routes/students');
var worksRouter = require('./routes/works');
let projectsRouter = require('./routes/projects');
let healthcheck = require('./routes/healthCheck');
var indexRouter = require('./routes/index');
var express = require('express');
var logger = require('morgan');
const fileUpload = require('express-fileupload');

var app = express();


// Make sure you place body-parser before your CRUD handlers!

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//accept JSON data, please
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(logger('dev'));
app.use(express.static('public')); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')));

// Use express-fileupload
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/works', worksRouter);
app.use('/students', studentsRouter);
app.use('/projects', projectsRouter);
app.use('/healthCheck', healthcheck);

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
  res.render('error');
});

module.exports = app;