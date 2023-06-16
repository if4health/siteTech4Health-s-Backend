<<<<<<< HEAD
const healthcheckRouter = require('./routes/healthCheck');
const createError = require('http-errors');
const path = require('path');
const bodyParser= require('body-parser')
const express = require('express');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const worksRouter = require('./routes/works');
const projectsRouter = require('./routes/projects');
const linkTreesRouter = require('./routes/linkTrees');
const whiteListRouter = require('./routes/auth/whitelist');
const unauthorizedRouter = require('./routes/unauthorized');
const loginRouter = require('./routes/login');

const authGoogle = require('./routes/auth/auth');
const passport = require('passport');
const session = require('express-session');

const app = express();

=======
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

>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a
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
app.use(session({secret: "asdasd"}));
app.use(express.static('public')); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
<<<<<<< HEAD
app.use(passport.initialize());
app.use(passport.session());
=======
>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a

// Use express-fileupload
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/auth', authGoogle);
app.use('/works', worksRouter);
app.use('/projects', projectsRouter);
<<<<<<< HEAD
app.use('/students', studentsRouter);
app.use('/linkTrees', linkTreesRouter);
app.use('/whiteList', whiteListRouter);
app.use('/healthCheck', healthcheckRouter);
app.use('/login', loginRouter);
app.use('/unauthorized', unauthorizedRouter);
=======
app.use('/linkTrees', linkTreesRouter);
app.use('/healthCheck', healthcheck);
>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a

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