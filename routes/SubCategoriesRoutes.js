const express = require("express");
const {
    addCategoryIdToReqBody,
    addFilterToReqBody
} = require("../middlewares/subCategoryMiddleware")
const {
    getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require("../utils/validators/subCategoryValidator");

const {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
} = require("../controllers/SubCategoriesController");

let router = express.Router({ mergeParams: true });

router.route("/")
    .get(
        addFilterToReqBody,
        getSubCategories
    )
    .post(
        addCategoryIdToReqBody,
        createSubCategoryValidator,
        createSubCategory
    );

router.route("/:id")
    .get(
        getSubCategoryValidator,
        getSubCategory
    )
    .patch(
        updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        deleteSubCategoryValidator,
        deleteSubCategory
    );

module.exports = router;