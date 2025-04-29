const express = require("express");

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require("../utils/validators/brandValidator");

const {
    getAllBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
} = require("../controllers/BrandController");

let router = express.Router();

router.route("/")
    .get(getAllBrands)
    .post(createBrandValidator, createBrand);

router.route("/:id")
    .get(getBrandValidator, getBrand)
    .patch(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand);

module.exports = router;