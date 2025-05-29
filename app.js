const express = require("express");
const morgan = require("morgan");

const CategoriesRoutes = require("./routes/CategoriesRoutes");
const SubCategoriesRoutes = require("./routes/SubCategoriesRoutes");
const brandsRoutes = require("./routes/BrandsRoutes");
const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRouts");
const reviewsRoutes = require("./routes/ReviewRoutes");
const wishlistRoutes = require("./routes/WishlistRouts");
const addressesRoutes = require("./routes/AddressRouts");
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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/addresses", addressesRoutes);

// default route
app.use(DefaultRoute)

app.use(globalErrorHandler);

module.exports = app;