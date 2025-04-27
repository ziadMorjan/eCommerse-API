const express = require("express");

const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require("../utils/validators/categoryValidator");

const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/CategoryController");

let router = express.Router();

router.route("/")
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route("/:id")
    .get(getCategoryValidator, getCategory)
    .patch(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;