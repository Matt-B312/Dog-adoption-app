var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
require('./config/database');
const flash = require('connect-flash');
const methodOverRide = require('method-override')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let session = require('express-session');
let passport = require('./helper/ppConfig');


app.use(session({
     secret: process.env.secret,
     saveUninitialized: true,
     resave: false,
     cookie: {maxAge: 360000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//sharing the info with all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
})

app.use(methodOverRide('_method'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flightsRouter = require('./routes/flights');
var ticketsRouter = require('./routes/tickets');
var petRouter = require('./routes/pet');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', flightsRouter);
app.use('/', ticketsRouter);
app.use('/', petRouter);
app.use('/', authRouter);

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
