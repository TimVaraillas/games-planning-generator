require('./config/config');
require('./config/passport');

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("passport");

var jwtHelpers = require("./helpers/jwt.helpers");

var userRouter = require("./routes/user.router");
var tournamentRouter = require("./routes/tournament.router");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connexion
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(function() {
    console.log("Database is connected")
  }, function (err) {
    console.log("Can not connect to the database" + err)
  });

// Passport setup
app.use(passport.initialize());

// Routes
app.use("/user", userRouter);
app.use("/tournament", jwtHelpers.verifyJwtToken, tournamentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;