const express = require("express");
const morgan = require("morgan");

const CategoriesRoutes = require("./routes/CategoriesRoutes");
const DefaultRoute = require("./routes/DefaultRoute");
const { globalErrorHandler } = require("./middlewares/ErrorMiddleware");

let app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/categories", CategoriesRoutes);
app.use(DefaultRoute)

app.use(globalErrorHandler);

module.exports = app;