const validator = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

let getSubCategoryValidator = [
    validator.check("id")
        .isMongoId().withMessage("Invalid SubCategory ID format"),

    validationMiddleware
]

let createSubCategoryValidator = [
    validator.check("name")
        .notEmpty().withMessage("subCategory name is required")
        .isLength({ min: 3 }).withMessage("subCategory name must be larger than 3")
        .isLength({ max: 32 }).withMessage("subCategory name must be less than 32"),

    validator.oneOf([
        validator.check("category")
            .notEmpty().withMessage("SubCategory must belong to parent category")
            .isMongoId().withMessage("Invalid SubCategory ID format"),

        validator.check("categoryId")
            .notEmpty().withMessage("SubCategory must belong to parent category")
            .isMongoId().withMessage("Invalid SubCategory ID format")
    ]),

    validationMiddleware
]

let updateSubCategoryValidator = [
    validator.check("id")
        .isMongoId().withMessage("Invalid SubCategory ID format"),

    validator.check("name").optional()
        .notEmpty().withMessage("subCategory name is required")
        .isLength({ min: 3 }).withMessage("subCategory name must be larger than 3")
        .isLength({ max: 32 }).withMessage("subCategory name must be less than 32"),

    validator.check("category").optional()
        .notEmpty().withMessage("SubCategory must belong to parent category")
        .isMongoId().withMessage("Invalid SubCategory ID format"),

    validationMiddleware
]

let deleteSubCategoryValidator = [
    validator.check("id")
        .isMongoId().withMessage("Invalid SubCategory ID format"),

    validationMiddleware
]

module.exports = {
    getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
}