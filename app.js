let healthcheck = require('./routes/healthCheck');

let createError = require('http-errors');
let path = require('path');
let bodyParser= require('body-parser')
let express = require('express');
let logger = require('morgan');
const fileUpload = require('express-fileupload');

let indexRouter = require('./routes/index');
let studentsRouter = require('./routes/students');
let worksRouter = require('./routes/works');
let projectsRouter = require('./routes/projects');
let linkTreesRouter = require('./routes/linkTrees');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

// Use express-fileupload
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/works', worksRouter);
app.use('/students', studentsRouter);
app.use('/projects', projectsRouter);
app.use('/linkTrees', linkTreesRouter);
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