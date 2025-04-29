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

const subCategoriesRoutes = require("./SubCategoriesRoutes");

let router = express.Router({ mergeParams: true });

router.use("/:categoryId/subCategories", subCategoriesRoutes);

router.route("/")
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route("/:id")
    .get(getCategoryValidator, getCategory)
    .patch(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);


module.exports = router;