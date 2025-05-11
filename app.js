const path = require("path")

const express = require("express");
const morgan = require("morgan");

const CategoriesRoutes = require("./routes/CategoriesRoutes");
const SubCategoriesRoutes = require("./routes/SubCategoriesRoutes");
const brandsRoutes = require("./routes/BrandsRoutes");
const productRoutes = require("./routes/ProductRoutes");
const DefaultRoute = require("./routes/DefaultRoute");
const { globalErrorHandler } = require("./middlewares/errorMiddleware");

let app = express();


// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

// routes
app.use("/api/v1/categories", CategoriesRoutes);
app.use("/api/v1/subCategories", SubCategoriesRoutes);
app.use("/api/v1/brands", brandsRoutes);
app.use("/api/v1/products", productRoutes);
app.use(DefaultRoute)

app.use(globalErrorHandler);

module.exports = app;