const express = require("express");

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require("../utils/validators/productValidator");

const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/ProductController");

let router = express.Router();

router.route("/")
    .get(getProducts)
    .post(createProductValidator, createProduct);

router.route("/:id")
    .get(getProductValidator, getProduct)
    .patch(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;