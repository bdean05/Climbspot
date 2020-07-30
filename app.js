require("dotenv").config();
require("./config/dbConnection");
require("./models/User");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(cookieParser());
//session

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);

// middleware custom

function checklogStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  next();
}

app.use(checklogStatus);

//middleware custom same as function checklogStatus
// app.use((req, res, next) => {
//   if (req.session.currentUser) {
//     res.locals.user = req.session.currentUser;
//     res.locals.isLoggedIn = true;
//   } else {
//     res.locals.isLoggedIn = false;
//   }
//   next();
// });

// connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {})
  .catch(err => {
    console.log(err);
  });

//Routes configuration
app.use(require("./routes"));
app.use("/", require("./routes/spots.api"));
const indexRouter = require("./routes/index");
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/", indexRouter);
app.use("/", require("./routes/spots"));
app.use("/", require("./routes/result"));
app.use("/", require("./routes/about"));
app.use("/", require("./routes/blog"));
app.use("/", require("./routes/userEdit"));
// Ligne ci-dessous rajouté par Hakim

app.use('/', require('./routes/teddy-result'));
app.use('/', require('./routes/teddy-blog'));

app.locals.site_url = process.env.SITE_URL;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
