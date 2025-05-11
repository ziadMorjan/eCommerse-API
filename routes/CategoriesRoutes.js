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
    deleteCategory,
    uploadImage,
    resizeImage
} = require("../controllers/CategoryController");

const subCategoriesRoutes = require("./SubCategoriesRoutes");

let router = express.Router({ mergeParams: true });

router.use("/:categoryId/subCategories", subCategoriesRoutes);

router.route("/")
    .get(getCategories)
    .post(
        uploadImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    );

router.route("/:id")
    .get(
        getCategoryValidator,
        getCategory
    )
    .patch(
        uploadImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )
    .delete(
        deleteCategoryValidator,
        deleteCategory
    );


module.exports = router;