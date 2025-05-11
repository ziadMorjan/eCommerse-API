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
    deleteSubCategory,
    uploadImage,
    resizeImage
} = require("../controllers/SubCategoriesController");

let router = express.Router({ mergeParams: true });

router.route("/")
    .get(
        addFilterToReqBody,
        getSubCategories
    )
    .post(
        uploadImage,
        resizeImage,
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
        uploadImage,
        resizeImage,
        updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        deleteSubCategoryValidator,
        deleteSubCategory
    );

module.exports = router;