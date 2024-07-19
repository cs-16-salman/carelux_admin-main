const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const compression = require("compression");

const adminRouter = require("./controller/adminController");
const adminRestRouter = require("./controller/adminRestController");
const passport = require("./config/passport-config");

const app = express();

// view engine setup
app.set("view engine", "ejs");

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Middleware to copy session to locals
app.use((req, res, next) => {
  res.locals = req.session;
  next();
});

app.use(compression());

app.use("/ajax", adminRestRouter);
app.use("/cockpit", adminRouter);

module.exports = app;
