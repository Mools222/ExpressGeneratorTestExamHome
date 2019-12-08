var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// [Add session]
let session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var devicesRouter = require('./routes/devices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// [Set title]
app.locals.title = "IKEA Trådfri";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// [Setup session]
app.use(session({
    secret: "jdsfonsdf8y4393h9wy823rhsodf",
    resave: true,
    saveUninitialized: false,
    // cookie: {maxAge: 30000}
}));

// [Counting views with session]
app.use((req, res, next) => {
    req.session.counter = req.session.counter ? req.session.counter++ : 1;
    console.log('Number of page views (session ID "' + req.session.id + '"): ' + req.session.counter);
    next();
});

// [Counting views with a cookie]
app.use((req, res, next) => {
    let visits = req.cookies.visits ? req.cookies.visits : 0;
    res.cookie('visits', ++visits);
    console.log('Number of page views (cookie ID "' + req.cookies['connect.sid'] + '"): ' + visits);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/devices', devicesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
