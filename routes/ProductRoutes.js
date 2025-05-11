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
    deleteProduct,
    uploadMixImages,
    resizeMixImages
} = require("../controllers/ProductController");

let router = express.Router();

router.route("/")
    .get(getProducts)
    .post(
        uploadMixImages,
        resizeMixImages,
        createProductValidator,
        createProduct
    );

router.route("/:id")
    .get(getProductValidator, getProduct)
    .patch(
        uploadMixImages,
        resizeMixImages,
        updateProductValidator,
        updateProduct
    )
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;