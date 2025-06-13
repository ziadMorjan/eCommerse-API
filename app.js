const express = require("express");
const morgan = require("morgan");
const passport = require('passport');

// import strategy
const strategies = require('./config/passport');

// import routes
const routes = require("./routes");

// import globalErrorHandler
const { globalErrorHandler } = require("./middlewares/ErrorMiddleware");

let app = express();

// use strategies
passport.use(strategies.googleStrategy);
passport.use(strategies.facebookStrategy);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));
app.use(passport.initialize());

// routes
routes(app);

app.use(globalErrorHandler);

module.exports = app;