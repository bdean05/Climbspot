require("dotenv").config();
require("./config/dbConnection");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose")


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log("Connected to ${self.connection.name}");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes configuration
app.use("/", require("./routes/spots.api"));
var indexRouter = require("./routes/index");
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/", indexRouter);




app.locals.site_url = process.env.SITE_URL;
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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