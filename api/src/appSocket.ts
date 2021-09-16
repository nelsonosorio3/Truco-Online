var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import * as cors from "cors";
import "reflect-metadata";

var indexRouter = require("./routes/index");

var appSocket = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

appSocket.use(logger("dev"));
appSocket.use(express.json());
appSocket.use(express.urlencoded({ extended: false }));
appSocket.use(cookieParser());
appSocket.use(express.static(path.join(__dirname, "public")));
appSocket.use(cors());

appSocket.use("/", indexRouter);

// catch 404 and forward to error handler
appSocket.use(function (req, res, next) {
  next(createError(404));
});

// error handler
appSocket.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default appSocket;
