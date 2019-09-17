var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/banners')
require('./models/product')
require('./models/category')
require('./models/store')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bannersRouter = require('./routes/banners');
var producstRouter = require('./routes/products');
var catagoriesRouter = require('./routes/categories');
var storeRouter = require('./routes/stores')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(logger('dev'));

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/banners', bannersRouter);
app.use('/products', producstRouter);
app.use('/categories', catagoriesRouter);
app.use('/stores', storeRouter);

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/api', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

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
